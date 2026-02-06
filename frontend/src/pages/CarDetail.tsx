
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCarDetail, createReservation, fetchCarExtras, fetchDestinations } from '../services/api';
import type { Car, CarExtra, Destination } from '../types';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
const CarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [extras, setExtras] = useState<CarExtra[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submissionErrors, setSubmissionErrors] = useState<Record<string, string[]>>({});
  
  const [formData, setFormData] = useState({
    name_surname: '',
    email: '',
    pickup_datetime: '',
    return_datetime: '',
    destination: '',
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

  // Dynamic Date Calculation
  const daysCount = useMemo(() => {
    if (!formData.pickup_datetime || !formData.return_datetime) return 1;
    const start = new Date(formData.pickup_datetime).getTime();
    const end = new Date(formData.return_datetime).getTime();
    const diff = end - start;
    if (diff <= 0) return 1;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [formData.pickup_datetime, formData.return_datetime]);

  // Dynamic Total Price Calculation
  const totalPrice = useMemo(() => {
    if (!car) return 0;
    const basePrice = parseFloat(car.price);
    const extrasPricePerDay = extras
      .filter(e => selectedExtras.includes(e.id))
      .reduce((acc, curr) => acc + parseFloat(curr.price), 0);
    
    return (basePrice + extrasPricePerDay) * daysCount;
  }, [car, extras, selectedExtras, daysCount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field if it exists
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
    if (e.target.files && e.target.files[0]) {
      if (type === 'front') setPassportFront(e.target.files[0]);
      else setPassportBack(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!car) return;
    setSubmissionErrors({});

    const pickupDate = new Date(formData.pickup_datetime);
    const returnDate = new Date(formData.return_datetime);
    
    if (returnDate <= pickupDate) {
      setSubmissionErrors({ return_datetime: ["Return date must be after pickup date."] });
      return;
    }
    if (!phone) {
      setSubmissionErrors({
        phone_number: ['Phone number is required'],
      });
      return;
    }
    setSubmitting(true);
    const data = new FormData();
    data.append('name_surname', formData.name_surname);
    data.append('phone_number', phone);
    data.append('email', formData.email);
    data.append('pickup_datetime', pickupDate.toISOString());
    data.append('return_datetime', returnDate.toISOString());
    data.append('car', car.id.toString());
    data.append('status', 'pending');

    if (formData.destination) {
      data.append('destination', formData.destination);
    }

    const extrasPayload = extras
  .filter(e => selectedExtras.includes(e.id))
  .map(e => ({
    name: e.name,
    price: e.price,
  }));

data.append('extras', JSON.stringify(extrasPayload));

    if (passportFront) data.append('passport_front', passportFront);
    if (passportBack) data.append('passport_back', passportBack);

    try {
    await createReservation(data);
    setSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => navigate('/'), 4000);
} catch (err: any) {
    console.error("Reservation Error:", err); // <-- log full error to console

    // Default message
    let userFriendlyErrors: Record<string, string[]> = {
        non_field_errors: ['The phone number is not valid.'],
    };

    // Try to parse API errors if JSON
    try {
        const parsedError = JSON.parse(err.message);
        userFriendlyErrors = parsedError;
    } catch {
        // If parsing fails, fallback to your own messages
        if (!phone) {
            userFriendlyErrors = { phone_number: ['The phone number is not valid.'] };
        }
    }

    setSubmissionErrors(userFriendlyErrors);
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

  const imageUrl = car.image?.startsWith('https') ? car.image : car.image ? `https://aurarental-production.up.railway.app/${car.image}` : 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200';

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
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Car Info - Left Column */}
        <div className="w-full lg:col-span-7 space-y-6 md:space-y-8 animate-reveal">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-[#8ecd24] transition-colors font-black text-[10px] md:text-xs uppercase tracking-widest">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
            Back to fleet
          </button>

          <div className="rounded-2xl md:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] bg-[#0b1c1c]">
            <img src={imageUrl} alt={car.name} className="w-full aspect-[16/10] md:aspect-video object-cover hover:scale-105 transition-transform duration-1000" />
          </div>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
              <div className="space-y-2">
                <span className="text-[#8ecd24] font-black text-[10px] tracking-[0.4em] uppercase block">{car.category || 'Elite Collection'}</span>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase italic leading-none">{car.name}</h1>
              </div>
              <div className="bg-[#8ecd24]/5 border border-[#8ecd24]/20 p-4 md:p-6 rounded-[2rem] text-left md:text-right backdrop-blur-xl">
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Base Rate</p>
                <div className="flex items-baseline gap-1 md:justify-end">
                  <span className="text-4xl md:text-5xl font-black text-[#8ecd24]">${car.price}</span>
                  <span className="text-white/40 text-xs font-bold">/DAY</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Seats', value: car.seats || 5, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                { label: 'Trans', value: car.transmission || 'Manual', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
                { label: 'Doors', value: car.doors || 4, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                { label: 'A/C', value: car.air_conditioning ? 'Yes' : 'No', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
              ].map(spec => (
                <div key={spec.label} className="bg-white/[0.03] border border-white/5 p-4 rounded-3xl flex flex-col items-center md:items-start group hover:border-[#8ecd24]/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#8ecd24]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-[#8ecd24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={spec.icon} /></svg>
                  </div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">{spec.label}</p>
                  <p className="text-white font-bold text-sm">{spec.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#0b1c1c]/50 p-6 md:p-8 rounded-[2.5rem] border border-white/5">
              <h3 className="text-xs font-black text-[#8ecd24] uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#8ecd24]/30"></span>
                Details & Benefits
              </h3>
              <div className="prose prose-invert max-w-none text-lg">
                {renderDetail(car.detail)}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Sidebar - Right Column */}
        <div className="w-full lg:col-span-5 lg:sticky lg:top-32">
          <div className="bg-[#0b1c1c] rounded-[2.5rem] p-6 md:p-10 border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] relative overflow-hidden group/form">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8ecd24]/5 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover/form:bg-[#8ecd24]/10 transition-colors"></div>
            
            {success ? (
              <div className="py-20 text-center animate-reveal relative z-10">
                <div className="w-20 h-20 bg-[#8ecd24] rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(142,205,36,0.4)]">
                  <svg className="w-10 h-10 text-[#011111]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-3xl font-black mb-4 uppercase italic text-white tracking-tighter">Request Received</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Our concierge team is reviewing your selection. We'll contact you within 15 minutes to confirm availability.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-white/10 pb-6 mb-2">
                  <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Reservation Hub</h2>
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Estimated Total</p>
                    <div className="flex items-center sm:justify-end gap-2">
                      <p className="text-3xl font-black text-[#8ecd24] tracking-tight">${totalPrice.toFixed(0)}</p>
                      <span className="text-[10px] text-white/20 font-bold uppercase">USD</span>
                    </div>
                  </div>
                </div>

                {/* Global Errors */}
                {submissionErrors.non_field_errors && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {submissionErrors.non_field_errors[0]}
                  </div>
                )}

                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                    <input required name="name_surname" value={formData.name_surname} onChange={handleInputChange} type="text" placeholder="GENTI PRESTIGE" className={`w-full bg-white/[0.03] border ${submissionErrors.name_surname ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 focus:outline-none focus:border-[#8ecd24] text-white text-sm transition-all`} />
                    {submissionErrors.name_surname && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{submissionErrors.name_surname[0]}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email</label>
                      <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="client@aurarental.com" className={`w-full bg-white/[0.03] border ${submissionErrors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 focus:outline-none focus:border-[#8ecd24] text-white text-sm transition-all`} />
                      {submissionErrors.email && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{submissionErrors.email[0]}</p>}
                    </div>
 <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Direct Line</label>
                      <PhoneInput
                        international
                        defaultCountry="AL"
                        value={phone}
                        onChange={setPhone}
                        className={`phone-input-aura ${submissionErrors.phone_number ? 'phone-input-error' : ''}`}
                      />
                      {submissionErrors.phone_number && (
                        <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">
                          {submissionErrors.phone_number[0]}
                        </p>
                      )}
                    </div>

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Pick-up</label>
                      <input required name="pickup_datetime" value={formData.pickup_datetime} onChange={handleInputChange} type="datetime-local" step={3600} className={`w-full bg-white/[0.03] border ${submissionErrors.pickup_datetime ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 focus:outline-none focus:border-[#8ecd24] text-white text-sm transition-all`} />
                      {submissionErrors.pickup_datetime && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{submissionErrors.pickup_datetime[0]}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Return</label>
                      <input required name="return_datetime" value={formData.return_datetime} onChange={handleInputChange} type="datetime-local" step={3600} className={`w-full bg-white/[0.03] border ${submissionErrors.return_datetime ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 focus:outline-none focus:border-[#8ecd24] text-white text-sm transition-all`} />
                      {submissionErrors.return_datetime && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{submissionErrors.return_datetime[0]}</p>}
                    </div>
                  </div>
                  {/* Destination Dropdown */}
                  {destinations.length > 0 && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                        Final Destination
                      </label>

                      <div className="relative">
                        <select
                          name="destination"
                          value={formData.destination}
                          onChange={handleInputChange}
                          required
                          className={`
                            w-full
                            bg-white/[0.03]
                            border
                            ${submissionErrors.destination ? 'border-red-500/50' : 'border-white/10'}
                            rounded-2xl
                            px-5
                            py-4
                            pr-12
                            focus:outline-none
                            focus:border-[#8ecd24]
                            text-white
                            text-sm
                            transition-all
                            appearance-none
                            cursor-pointer
                          `}
                        >
                          <option value="" className="bg-[#011111] text-gray-400">
                            Select Destination
                          </option>

                          {destinations.map(dest => (
                            <option
                              key={dest.id}
                              value={dest.id}
                              className="bg-[#011111] text-white"
                              
                            >
                              {dest.name}
                            </option>
                          ))}
                        </select>

                        {/* Chevron */}
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {submissionErrors.destination && (
                        <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">
                          {submissionErrors.destination[0]}
                        </p>
                      )}
                    </div>
                  )}
                  {/* Extras Section */}
                  {extras.length > 0 && (
                    <div className="pt-2 space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Curated Extras</label>
                        <span className="text-[9px] font-bold text-[#8ecd24] bg-[#8ecd24]/10 px-2 py-0.5 rounded-full">Per Day</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {extras.map(extra => (
                          <div 
                            key={extra.id} 
                            onClick={() => handleExtraToggle(extra.id)}
                            className={`flex justify-between items-center p-4 rounded-2xl border transition-all cursor-pointer group ${selectedExtras.includes(extra.id) ? 'bg-[#8ecd24]/10 border-[#8ecd24]/50 text-white' : 'bg-white/[0.02] border-white/10 text-gray-500 hover:border-white/20'}`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${selectedExtras.includes(extra.id) ? 'bg-[#8ecd24] border-[#8ecd24]' : 'bg-transparent border-gray-700'}`}>
                                {selectedExtras.includes(extra.id) && <svg className="w-4 h-4 text-[#011111]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>}
                              </div>
                              <span className={`text-xs font-bold uppercase tracking-tight ${selectedExtras.includes(extra.id) ? 'text-white' : 'group-hover:text-gray-300'}`}>{extra.name}</span>
                            </div>
                            <span className="text-[#8ecd24] font-black text-xs">+${extra.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 grid grid-cols-2 gap-4">
                    <label className={`relative cursor-pointer p-6 rounded-[2rem] border-2 border-dashed transition-all flex flex-col items-center gap-2 group/upload ${passportFront ? 'bg-[#8ecd24]/5 border-[#8ecd24]/40' : 'bg-white/[0.03] border-white/10 hover:border-white/30'}`}>
                      <input required type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'front')} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <svg className="w-6 h-6 text-gray-600 group-hover/upload:text-[#8ecd24] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
                      <span className="text-[9px] font-black uppercase tracking-widest text-center leading-tight">{passportFront ? 'Front Loaded' : 'Passport Front'}</span>
                    </label>
                    <label className={`relative cursor-pointer p-6 rounded-[2rem] border-2 border-dashed transition-all flex flex-col items-center gap-2 group/upload ${passportBack ? 'bg-[#8ecd24]/5 border-[#8ecd24]/40' : 'bg-white/[0.03] border-white/10 hover:border-white/30'}`}>
                      <input required type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'back')} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <svg className="w-6 h-6 text-gray-600 group-hover/upload:text-[#8ecd24] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
                      <span className="text-[9px] font-black uppercase tracking-widest text-center leading-tight">{passportBack ? 'Back Loaded' : 'Passport Back'}</span>
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                   <button 
                    disabled={submitting}
                    className="w-full bg-[#8ecd24] text-[#011111] py-5 rounded-[1.5rem] font-black uppercase text-sm tracking-widest hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-[0_20px_40px_rgba(142,205,36,0.3)] group/btn"
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-[#011111] border-t-transparent rounded-full animate-spin"></div>
                        Syncing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Confirm Reservation
                        <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </span>
                    )}
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
