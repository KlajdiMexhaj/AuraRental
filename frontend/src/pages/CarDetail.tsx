import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCarDetail, createReservation, fetchCarExtras, fetchDestinations } from '../services/api';
import type { Car, CarExtra, Destination } from '../types';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const CarDetail: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];

  const hours = Array.from({ length: 24 }, (_, i) => {
    const h = i.toString().padStart(2, "0");
    return `${h}:00`;
  });
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [extras, setExtras] = useState<CarExtra[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showReview, setShowReview] = useState(false); 
  const [submissionErrors, setSubmissionErrors] = useState<Record<string, string[]>>({});
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [formData, setFormData] = useState({
    name_surname: '',
    email: '',
    pickup_datetime: '',
    return_datetime: '',
    destination: '', // This will store the ID of the selected destination
  });
  const [phone, setPhone] = useState<string | undefined>();
  const [passportFront, setPassportFront] = useState<File | null>(null);
  const [passportBack, setPassportBack] = useState<File | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        const [carData, extrasData, destinationsData] = await Promise.all([
          fetchCarDetail(parseInt(id)),
          fetchCarExtras(),
          fetchDestinations()
        ]);
        setCar(carData);
        setExtras(extrasData.results);
        setDestinations(destinationsData.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

const priceBreakdown = useMemo(() => {
  if (!car) return { days: 1, carTotal: 0, extrasTotal: 0, total: 0 };
  
  let days = 1;
  let carTotal = 0;

  if (formData.pickup_datetime && formData.return_datetime) {
    const start = new Date(formData.pickup_datetime);
    const end = new Date(formData.return_datetime);

    if (end > start) {
      // ---------- DAY CALCULATION (3-HOUR RULE) ----------
      const baseDays =
        Math.floor(
          (new Date(end.toDateString()).getTime() -
            new Date(start.toDateString()).getTime()) /
            (1000 * 60 * 60 * 24)
        );

      const comparisonDate = new Date(start);
      comparisonDate.setDate(comparisonDate.getDate() + baseDays);

      const extraHours =
        (end.getTime() - comparisonDate.getTime()) /
        (1000 * 60 * 60);

      if (extraHours >= 3) {
        days = baseDays + 1;
      } else {
        days = baseDays;
      }

      if (days <= 0) days = 1;

      // ---------- CAR PRICE CALCULATION ----------
      for (let i = 0; i < days; i++) {
        const currentDay = new Date(start);
        currentDay.setDate(start.getDate() + i);
        const dateStr = currentDay.toISOString().split('T')[0];

        const period = car.price_periods?.find((p: any) =>
          dateStr >= p.start_date && dateStr < p.end_date
        );

        carTotal += period
          ? parseFloat(period.price_per_day)
          : parseFloat(car.price);
      }
    }
  } else {
    carTotal = parseFloat(car.price);
  }

  const selectedExtrasObj = extras.filter(e =>
    selectedExtras.includes(e.id)
  );

  const extrasPricePerDay = selectedExtrasObj.reduce(
    (acc, curr) => acc + parseFloat(curr.price),
    0
  );

  const extrasTotal = extrasPricePerDay * days;

  return {
    days,
    carTotal,
    extrasTotal,
    total: carTotal + extrasTotal
  };
}, [car, extras, selectedExtras, formData.pickup_datetime, formData.return_datetime]);

  const allImages = useMemo(() => {
    if (!car) return [];
    const images: string[] = [];
    const baseUrl = "https://aurarental.pythonanywhere.com/";
    if (car.image) {
      images.push(car.image.startsWith('https') ? car.image : `${baseUrl}${car.image}`);
    }
    if (car.extra_images && car.extra_images.length > 0) {
      car.extra_images.forEach((imgObj) => {
        images.push(imgObj.image.startsWith('https') ? imgObj.image : `${baseUrl}${imgObj.image}`);
      });
    }
    return images;
  }, [car]);

  const nextImage = () => { setCurrentImageIndex((prev) => (prev + 1) % allImages.length); };
  const prevImage = () => { setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length); };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
    if (submissionErrors[e.target.name]) {
      const newErrors = { ...submissionErrors };
      delete newErrors[e.target.name];
      setSubmissionErrors(newErrors);
    }
  };

  const handleExtraToggle = (extraId: number) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) ? prev.filter(id => id !== extraId) : [...prev, extraId]
    );
  };

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back') => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (type === 'front') {
    setPassportFront(file);
  } else {
    setPassportBack(file);
  }
};
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!car) return;

  if (!showReview) {
    const errors: Record<string, string[]> = {};
    if (!formData.name_surname.trim()) errors.name_surname = ['Full name is required.'];
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = ['Valid email is required.'];
    if (!phone) errors.phone_number = ['Phone number is required.'];
    if (!formData.pickup_datetime) errors.pickup_datetime = ['Pick-up time is required.'];
    if (!formData.return_datetime) errors.return_datetime = ['Return time is required.'];
    if (!formData.destination) errors.destination = ['Please select a destination.'];
    if (!passportFront) errors.passport_front = ['Driver License Front is required.'];
    if (!passportBack) errors.passport_back = ['Driver License Back is required.'];

    if (formData.pickup_datetime && formData.return_datetime) {
      if (new Date(formData.return_datetime) <= new Date(formData.pickup_datetime)) {
        errors.return_datetime = ['Return must be after pick-up.'];
      }
    }

    if (Object.keys(errors).length > 0) {
      setSubmissionErrors(errors);
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setSubmissionErrors({});
    setShowReview(true);
    return;
  }

  setSubmissionErrors({});
  setSubmitting(true);

  const data = new FormData();

  // basic fields
  data.append('car', car.id.toString());
  data.append('name_surname', formData.name_surname);
  data.append('email', formData.email);
  data.append('phone_number', phone || '');
  data.append('pickup_datetime', formData.pickup_datetime);
  data.append('return_datetime', formData.return_datetime);
  data.append('destination', formData.destination);

  // files
  if (passportFront) data.append('passport_front', passportFront);
  if (passportBack) data.append('passport_back', passportBack);

  // extras -> send multiple fields (ListField<IntegerField>)
  const extrasPayload = selectedExtras.map(id => {
  const extra = extras.find(e => e.id === id);
  return {
    id: extra?.id,
    name: extra?.name,
    price: extra?.price
  };
});

if (extrasPayload.length > 0) {
  data.append('extras', JSON.stringify(extrasPayload));
}

  try {
    await createReservation(data);

    setSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => navigate('/'), 6000);
  } catch (err: any) {
    let message = 'Submission failed.';
    try {
      message = err.message || JSON.stringify(err);
    } catch {}

    setSubmissionErrors({
      non_field_errors: [message]
    });
    setShowReview(false);
  } finally {
    setSubmitting(false);
  }
};

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#011111]">
      <div className="w-12 h-12 border-4 border-[#8ecd24]/20 border-t-[#8ecd24] rounded-full animate-spin"></div>
    </div>
  );

  if (!car) return <div className="min-h-screen pt-40 text-center text-xl font-bold text-white uppercase tracking-tighter italic">Vehicle Not Located</div>;

  const renderDetail = (detailText?: string) => {
    if (!detailText) return <p className="text-gray-400 italic">Curated details arriving soon.</p>;
    return detailText.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('-')) {
        return (
          <div key={idx} className="flex items-start gap-3 mb-1.5 text-gray-300">
            <span className="text-[#8ecd24] font-black">•</span>
            <span className="text-sm font-medium leading-relaxed">{trimmed.substring(1).trim()}</span>
          </div>
        );
      }
      return <p key={idx} className="mb-3 text-gray-400 text-base leading-relaxed">{trimmed}</p>;
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <style>{`
        input[type="datetime-local"]::-webkit-datetime-edit-minute-field { display: none !important; }
        input[type="datetime-local"]::-webkit-datetime-edit-text:nth-of-type(2) { display: none !important; }
      `}</style>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Car Info */}
        <div className="w-full lg:col-span-7 space-y-6 md:space-y-8 animate-reveal">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-[#8ecd24] transition-colors font-black text-[10px] md:text-xs uppercase tracking-widest">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
            Back to fleet
          </button>

          <div className="space-y-4">
            <div className="group relative rounded-2xl md:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] bg-[#0b1c1c]">
              <img src={allImages[currentImageIndex]} alt={car.name} className="max-w-full max-h-full object-contain transition-all duration-500 ease-in-out" />
              {allImages.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#8ecd24] hover:text-black transition-all opacity-0 group-hover:opacity-100"><svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg></button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#8ecd24] hover:text-black transition-all opacity-0 group-hover:opacity-100"><svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg></button>
                </>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 no-scrollbar">
                {allImages.map((img, idx) => (
                  <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`relative flex-shrink-0 w-20 h-14 md:w-28 md:h-20 rounded-xl overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-[#8ecd24] scale-105' : 'border-white/10 opacity-40 hover:opacity-100'}`}><img src={img} className="w-full h-full object-cover" alt={`preview ${idx}`} /></button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
              <div className="space-y-2">
                <span className="text-[#8ecd24] font-black text-[10px] tracking-[0.4em] uppercase block">{car.category || 'Elite Collection'}</span>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase italic leading-none">{car.name}</h1>
              </div>
              <div className="bg-[#8ecd24]/5 border border-[#8ecd24]/20 p-4 md:p-6 rounded-[2rem] text-left md:text-right backdrop-blur-xl">
  <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
    Starting from
  </p>

  <div className="flex items-baseline gap-1 md:justify-end">
    <span className="text-4xl md:text-5xl font-black text-[#8ecd24]">
      {formData.pickup_datetime && formData.return_datetime
        ? (priceBreakdown.carTotal / priceBreakdown.days).toFixed(2)
        : parseFloat(car.price).toFixed(2)}
    </span>
    <span className="text-white/40 text-xs font-bold">/DAY</span>
  </div>
</div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { label: 'Seats', value: car.seats || 5, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                { label: 'Trans', value: car.transmission || 'Manual', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4' },
                { label: 'Doors', value: car.doors || 4, icon: 'M3 12l9-9 9 9M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10' },
                { label: 'A/C', value: car.air_conditioning ? 'Yes' : 'No', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                { label: 'Fuel', value: car.fuel_type || 'Petrol', icon: 'M3 3h13v10h2l2 3v5h-5v-5H8v5H3V3z' }
              ].map(spec => (
                <div key={spec.label} className="bg-white/[0.03] border border-white/5 p-4 rounded-3xl flex flex-col items-center group hover:border-[#8ecd24]/30 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-[#8ecd24]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"><svg className="w-4 h-4 text-[#8ecd24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={spec.icon} /></svg></div>
                  <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">{spec.label}</p>
                  <p className="text-white font-bold text-xs truncate w-full text-center">{spec.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#0b1c1c]/50 p-6 md:p-8 rounded-[2.5rem] border border-white/5">
              <h3 className="text-xs font-black text-[#8ecd24] uppercase tracking-[0.3em] mb-6 flex items-center gap-3"><span className="w-8 h-[1px] bg-[#8ecd24]/30"></span>Details & Benefits</h3>
              <div className="prose prose-invert max-w-none text-lg">{renderDetail(car.detail)}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="w-full lg:col-span-5 lg:sticky lg:top-32" id="booking-form">
          <div className="bg-[#0b1c1c] rounded-[2.5rem] p-6 md:p-10 border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] relative overflow-hidden group/form">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8ecd24]/5 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover/form:bg-[#8ecd24]/10 transition-colors"></div>
            
            {success ? (
              <div className="py-20 text-center animate-reveal relative z-10">
                <div className="w-20 h-20 bg-[#8ecd24] rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl"><svg className="w-10 h-10 text-[#011111]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
                <h2 className="text-3xl font-black mb-4 uppercase italic text-white tracking-tighter leading-tight">Reservation Submitted</h2>
                <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">We will contact you as soon as possible.</p>
              </div>
            ) : showReview ? (
                <div className="space-y-6 relative z-10 animate-reveal">
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Reservation Bill</h2>
                            <p className="text-[10px] text-[#8ecd24] font-bold uppercase tracking-widest">Review your elite booking</p>
                        </div>
                        <button onClick={() => setShowReview(false)} className="text-gray-500 text-[10px] font-black uppercase tracking-widest border border-white/10 px-3 py-1.5 rounded-full hover:bg-white hover:text-black transition-all">Edit Info</button>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                            <div className="col-span-2">
                                <p className="text-[9px] text-gray-500 font-black uppercase mb-1">Driver Information</p>
                                <p className="text-white font-bold text-sm uppercase">{formData.name_surname}</p>
                            </div>
                            <div>
                                <p className="text-[9px] text-gray-500 font-black uppercase mb-1">Phone</p>
                                <p className="text-white text-xs font-bold">{phone}</p>
                            </div>
                            <div>
                                <p className="text-[9px] text-gray-500 font-black uppercase mb-1">Email</p>
                                <p className="text-white text-xs font-bold truncate">{formData.email}</p>
                            </div>
                        </div>

                        <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                             <p className="text-[9px] text-gray-500 font-black uppercase mb-2">Schedule & Period</p>
                             <div className="flex justify-between items-center">
                                <div className="text-left">
                                    <p className="text-white font-black text-xs">{new Date(formData.pickup_datetime).toLocaleDateString()}</p>
                                    <p className="text-[#8ecd24] text-[10px] font-bold uppercase">{new Date(formData.pickup_datetime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                </div>
                                <div className="h-[1px] flex-1 mx-4 bg-white/10 relative">
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0b1c1c] px-2 text-[8px] text-gray-500 font-black">{priceBreakdown.days}D</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-white font-black text-xs">{new Date(formData.return_datetime).toLocaleDateString()}</p>
                                    <p className="text-[#8ecd24] text-[10px] font-bold uppercase">{new Date(formData.return_datetime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                </div>
                             </div>
                        </div>

                        <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                            <p className="text-[9px] text-gray-500 font-black uppercase mb-1">Destination</p>
                            <p className="text-white font-bold text-xs uppercase">
                                {destinations.find(d => d.id.toString() === formData.destination)?.name || 'Not Selected'}
                            </p>
                        </div>

                        {selectedExtras.length > 0 && (
                            <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                                <p className="text-[9px] text-gray-500 font-black uppercase mb-2">Curated Extras</p>
                                <div className="flex flex-wrap gap-2">
                                    {extras.filter(e => selectedExtras.includes(e.id)).map(extra => (
                                        <span key={extra.id} className="bg-[#8ecd24]/10 text-[#8ecd24] text-[9px] font-black uppercase px-2 py-1 rounded-md border border-[#8ecd24]/20">{extra.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-3 px-1 pt-2">
                            <div className="flex justify-between text-xs"><span className="text-gray-500 font-bold uppercase tracking-widest">Car Rental ({priceBreakdown.days} Days)</span><span className="text-white font-black">€{priceBreakdown.carTotal.toFixed(2)}</span></div>
                            {selectedExtras.length > 0 && (
                                <div className="flex justify-between text-xs"><span className="text-gray-500 font-bold uppercase tracking-widest">Selected Extras ({priceBreakdown.days} Days)</span><span className="text-white font-black">€{priceBreakdown.extrasTotal.toFixed(2)}</span></div>
                            )}
                            <div className="flex justify-between items-end pt-4 border-t border-white/10">
                                <span className="text-xl font-black text-[#8ecd24] uppercase italic tracking-tighter">Grand Total</span>
                                <div className="text-right">
                                    <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest mb-1">Pay on Pickup</p>
                                    <p className="text-4xl font-black text-[#8ecd24] leading-none">€{priceBreakdown.total.toFixed(0)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button onClick={handleSubmit} disabled={submitting} className="w-full bg-[#8ecd24] text-[#011111] py-6 rounded-[1.5rem] font-black uppercase text-sm tracking-[0.2em] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(142,205,36,0.3)]">
                        {submitting ? 'Confirming with Concierge...' : 'Complete Reservation'}
                    </button>
                </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter border-b border-white/10 pb-6 mb-2">Book Now</h2>

                {submissionErrors.non_field_errors && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {submissionErrors.non_field_errors[0]}
                  </div>
                )}

                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                    <input required name="name_surname" value={formData.name_surname} onChange={handleInputChange} type="text" placeholder="FULL NAME" className={`w-full bg-white/[0.03] border ${submissionErrors.name_surname ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 focus:outline-none focus:border-[#8ecd24] text-white text-sm transition-all`} />
                    {submissionErrors.name_surname && <p className="text-red-500 text-[10px] mt-1 font-bold italic ml-2">{submissionErrors.name_surname[0]}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email</label>
                      <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="client@aurarental.com" className={`w-full bg-white/[0.03] border ${submissionErrors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 focus:outline-none focus:border-[#8ecd24] text-white text-sm transition-all`} />
                      {submissionErrors.email && <p className="text-red-500 text-[10px] mt-1 font-bold italic ml-2">{submissionErrors.email[0]}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Phone number</label>
                      <PhoneInput required international defaultCountry="AL" value={phone} onChange={setPhone} className={`phone-input-aura ${submissionErrors.phone_number ? 'phone-input-error' : ''}`} />
                      {submissionErrors.phone_number && <p className="text-red-500 text-[10px] mt-1 font-bold italic ml-2">{submissionErrors.phone_number[0]}</p>}
                    </div>
                  </div>

                  {/* DESTINATION DROPDOWN ADDED HERE */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Pickup Destination</label>
                    <select 
                        required 
                        name="destination" 
                        value={formData.destination} 
                        onChange={handleInputChange} 
                        className={`w-full bg-[#0b1c1c] border ${submissionErrors.destination ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 focus:outline-none focus:border-[#8ecd24] text-white text-sm transition-all appearance-none cursor-pointer`}
                    >
                        <option value="" disabled className="text-gray-600">CHOOSE DESTINATION</option>
                        {destinations.map(dest => (
                            <option key={dest.id} value={dest.id} className="bg-[#0b1c1c] text-white">
                                {dest.name}
                            </option>
                        ))}
                    </select>
                    {submissionErrors.destination && <p className="text-red-500 text-[10px] mt-1 font-bold italic ml-2">{submissionErrors.destination[0]}</p>}
                  </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  {/* PICKUP */}
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
      Pick-up time
    </label>

    <div className={`flex items-center bg-white/[0.03] border ${
      submissionErrors.pickup_datetime ? 'border-red-500/50' : 'border-white/10'
    } rounded-2xl px-4 py-3 focus-within:border-[#8ecd24] transition-all`}>

      <input
        type="date"
        min={today}
        value={formData.pickup_datetime?.split("T")[0] || ""}
        onChange={(e) => {
          const time = formData.pickup_datetime?.split("T")[1] || "10:00";
          setFormData({
            ...formData,
            pickup_datetime: `${e.target.value}T${time}`
          });
        }}
        className="bg-transparent text-white flex-1 min-w-0 
                   focus:outline-none text-sm [color-scheme:dark]"
      />

      <div className="h-5 w-px bg-white/10 mx-3"></div>

      <select
        value={formData.pickup_datetime?.split("T")[1] || "10:00"}
        onChange={(e) => {
          const date = formData.pickup_datetime?.split("T")[0] || today;
          setFormData({
            ...formData,
            pickup_datetime: `${date}T${e.target.value}`
          });
        }}
        className="bg-transparent text-white text-sm 
                   focus:outline-none cursor-pointer 
                   appearance-none w-[40px] shrink-0"
      >
        {hours.map(h => (
          <option key={h} value={h} className="bg-[#0b1c1c] text-white">
            {h}
          </option>
        ))}
      </select>

    </div>

    {submissionErrors.pickup_datetime && (
      <p className="text-red-500 text-[10px] mt-1 font-bold italic ml-2">
        {submissionErrors.pickup_datetime[0]}
      </p>
    )}
  </div>


  {/* RETURN */}
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
      Return time
    </label>

    <div className={`flex items-center bg-white/[0.03] border ${
      submissionErrors.return_datetime ? 'border-red-500/50' : 'border-white/10'
    } rounded-2xl px-4 py-3 focus-within:border-[#8ecd24] transition-all`}>

      <input
        type="date"
        min={formData.pickup_datetime?.split("T")[0] || today}
        value={formData.return_datetime?.split("T")[0] || ""}
        onChange={(e) => {
          const time = formData.return_datetime?.split("T")[1] || "10:00";
          setFormData({
            ...formData,
            return_datetime: `${e.target.value}T${time}`
          });
        }}
        className="bg-transparent text-white flex-1 min-w-0 
                   focus:outline-none text-sm [color-scheme:dark]"
      />

      <div className="h-5 w-px bg-white/10 mx-3"></div>

      <select
        value={formData.return_datetime?.split("T")[1] || "10:00"}
        onChange={(e) => {
          const date = formData.return_datetime?.split("T")[0] || today;
          setFormData({
            ...formData,
            return_datetime: `${date}T${e.target.value}`
          });
        }}
        className="bg-transparent text-white text-sm 
                   focus:outline-none cursor-pointer 
                   appearance-none w-[40px] shrink-0"
      >
        {hours.map(h => (
          <option key={h} value={h} className="bg-[#0b1c1c] text-white">
            {h}
          </option>
        ))}
      </select>

    </div>

    {submissionErrors.return_datetime && (
      <p className="text-red-500 text-[10px] mt-1 font-bold italic ml-2">
        {submissionErrors.return_datetime[0]}
      </p>
    )}
  </div>

</div>

                  {extras.length > 0 && (
                    <div className="pt-2 space-y-4">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Curated Extras (Per Day)</label>
                      <div className="grid grid-cols-1 gap-3">
                        {extras.map(extra => (
                          <div key={extra.id} onClick={() => handleExtraToggle(extra.id)} className={`flex justify-between items-center p-4 rounded-2xl border transition-all cursor-pointer ${selectedExtras.includes(extra.id) ? 'bg-[#8ecd24]/10 border-[#8ecd24]/50' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}>
                            <div className="flex items-center gap-4">
                              <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedExtras.includes(extra.id) ? 'bg-[#8ecd24] border-[#8ecd24]' : 'bg-transparent border-gray-700'}`}>
                                {selectedExtras.includes(extra.id) && <svg className="w-3 h-3 text-[#011111]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>}
                              </div>
                              <span className={`text-xs font-bold uppercase ${selectedExtras.includes(extra.id) ? 'text-white' : 'text-gray-500'}`}>{extra.name}</span>
                            </div>
                            <span className="text-[#8ecd24] font-black text-xs">€{extra.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

<div className="pt-4 grid grid-cols-2 gap-4">

  {/* FRONT */}
  <div>
    <label
      className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all cursor-pointer
        ${passportFront
          ? 'bg-[#8ecd24]/10 border-[#8ecd24]/50'
          : 'bg-white/[0.02] border-white/10 hover:border-white/20'
        }`}
    >
      <input
        type="file"
        accept="image/jpeg,image/png"
        onChange={(e) => handleFileChange(e, 'front')}
        className="hidden"
      />

      <div className={`w-6 h-6 mb-3 rounded flex items-center justify-center border transition-all
        ${passportFront
          ? 'bg-[#8ecd24] border-[#8ecd24]'
          : 'bg-transparent border-gray-700'
        }`}
      >
        {passportFront && (
          <svg
            className="w-4 h-4 text-[#011111]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      <span
        className={`text-xs font-bold uppercase tracking-wide
          ${passportFront ? 'text-white' : 'text-gray-500'}
        `}
      >
        {passportFront ? 'Front Uploaded' : 'Front Driver License'}
      </span>
    </label>

    {!passportFront && submissionErrors.passport_front && (
      <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-widest">
        {submissionErrors.passport_front[0]}
      </p>
    )}
  </div>

  {/* BACK */}
  <div>
    <label
      className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all cursor-pointer
        ${passportBack
          ? 'bg-[#8ecd24]/10 border-[#8ecd24]/50'
          : 'bg-white/[0.02] border-white/10 hover:border-white/20'
        }`}
    >
      <input
        type="file"
        accept="image/jpeg,image/png"
        onChange={(e) => handleFileChange(e, 'back')}
        className="hidden"
      />

      <div className={`w-6 h-6 mb-3 rounded flex items-center justify-center border transition-all
        ${passportBack
          ? 'bg-[#8ecd24] border-[#8ecd24]'
          : 'bg-transparent border-gray-700'
        }`}
      >
        {passportBack && (
          <svg
            className="w-4 h-4 text-[#011111]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      <span
        className={`text-xs font-bold uppercase tracking-wide
          ${passportBack ? 'text-white' : 'text-gray-500'}
        `}
      >
        {passportBack ? 'Back Uploaded' : 'Back Driver License'}
      </span>
    </label>

    {!passportBack && submissionErrors.passport_back && (
      <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-widest">
        {submissionErrors.passport_back[0]}
      </p>
    )}
  </div>

</div>
                </div>

                <div className="pt-6 border-t border-white/10">
                   <button disabled={submitting} className="w-full bg-[#8ecd24] text-[#011111] py-5 rounded-[1.5rem] font-black uppercase text-sm tracking-widest hover:bg-white transition-all shadow-lg group/btn">
                      <span className="flex items-center justify-center gap-2">
                        {submitting ? 'Syncing...' : `Review Reservation — €${priceBreakdown.total.toFixed(0)}`}
                        <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </span>
                  </button>
                  <div className="flex items-center justify-center gap-3 mt-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8ecd24] animate-pulse"></div>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest font-black">Secure Payment on Pickup</p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;