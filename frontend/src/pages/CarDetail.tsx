
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCarDetail, createReservation, fetchCarExtras } from '../services/api';
import type { Car, CarExtra } from '../types';

const CarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [extras, setExtras] = useState<CarExtra[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name_surname: '',
    phone_number: '',
    email: '',
    pickup_datetime: '',
    return_datetime: '',
  });

  const [passportFront, setPassportFront] = useState<File | null>(null);
  const [passportBack, setPassportBack] = useState<File | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        const [carData, extrasData] = await Promise.all([
          fetchCarDetail(parseInt(id)),
          fetchCarExtras()
        ]);
        setCar(carData);
        setExtras(extrasData.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const daysCount = useMemo(() => {
    if (!formData.pickup_datetime || !formData.return_datetime) return 1;
    const start = new Date(formData.pickup_datetime).getTime();
    const end = new Date(formData.return_datetime).getTime();
    const diff = end - start;
    if (diff <= 0) return 1;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [formData.pickup_datetime, formData.return_datetime]);

  const totalPrice = useMemo(() => {
    if (!car) return 0;
    const basePrice = parseFloat(car.price);
    const extrasPrice = extras
      .filter(e => selectedExtras.includes(e.id))
      .reduce((acc, curr) => acc + parseFloat(curr.price), 0);
    
    return (basePrice + extrasPrice) * daysCount;
  }, [car, extras, selectedExtras, daysCount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submissionError) setSubmissionError(null);
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
    setSubmissionError(null);

    const pickupDate = new Date(formData.pickup_datetime);
    const returnDate = new Date(formData.return_datetime);
    
    if (returnDate <= pickupDate) {
      setSubmissionError("Return date must be after pickup date.");
      return;
    }

    setSubmitting(true);
    const data = new FormData();
    data.append('name_surname', formData.name_surname);
    data.append('phone_number', formData.phone_number);
    data.append('email', formData.email);
    data.append('pickup_datetime', pickupDate.toISOString());
    data.append('return_datetime', returnDate.toISOString());
    data.append('car', car.id.toString());
    data.append('status', 'pending');

    const selectedExtrasData = extras
      .filter(extra => selectedExtras.includes(extra.id))
      .map(extra => ({
        name: extra.name,
        price: extra.price,
      }));

    if (selectedExtrasData.length > 0) {
      data.append('extras', JSON.stringify(selectedExtrasData));
    }
    if (passportFront) data.append('passport_front', passportFront);
    if (passportBack) data.append('passport_back', passportBack);

    try {
      await createReservation(data);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => navigate('/'), 4000);
    } catch (err: any) {
      try {
        const parsedError = JSON.parse(err.message);
        // Extract first error message if available
        const firstKey = Object.keys(parsedError)[0];
        const errorMessage = Array.isArray(parsedError[firstKey]) ? parsedError[firstKey][0] : JSON.stringify(parsedError);
        setSubmissionError(`${firstKey.toUpperCase().replace('_', ' ')}: ${errorMessage}`);
      } catch {
        setSubmissionError(err.message || 'Validation error. Please check your information and retry.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#011111]">
      <div className="w-12 h-12 border-4 border-[#8ecd24]/20 border-t-[#8ecd24] rounded-full animate-spin"></div>
    </div>
  );

  if (!car) return <div className="min-h-screen pt-40 text-center text-xl font-bold text-white">Vehicle Not Found</div>;

  const imageUrl = car.image
  ? car.image.startsWith('http')
    ? car.image
    : `http://127.0.0.1:8000${car.image}`
  : '/vite.svg';

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Car Info */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8 animate-reveal">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-[#8ecd24] transition-colors font-bold text-xs md:text-sm uppercase">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            Back to fleet
          </button>

          <div className="rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
            <img src={imageUrl} alt={car.name} className="w-full aspect-video object-cover" />
          </div>

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
              <div>
                <span className="text-[#8ecd24] font-bold text-xs md:text-sm tracking-widest uppercase mb-1 block">{car.category || 'Luxury Fleet'}</span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase italic">{car.name}</h1>
              </div>
              <div className="text-left md:text-right">
                <span className="text-3xl md:text-4xl font-extrabold text-[#8ecd24]">${car.price}</span>
                <span className="text-gray-500 text-[10px] md:text-xs font-bold block uppercase mt-1">Base Daily Rate</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
              {[
                { label: 'Seats', value: car.seats || 4 },
                { label: 'Fuel', value: car.fuel || 'Petrol' },
                { label: 'Trans', value: car.transmission || 'Auto' },
                { label: 'Status', value: 'Verified' }
              ].map(spec => (
                <div key={spec.label} className="bg-white/5 border border-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl">
                  <p className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{spec.label}</p>
                  <p className="text-white font-bold text-sm md:text-base">{spec.value}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <h3 className="text-xs md:text-sm font-bold text-white uppercase tracking-widest mb-3 md:mb-4">The Experience</h3>
              <p className="text-gray-400 leading-relaxed text-base md:text-lg italic">
                "{car.description || 'Crafted for those who refuse to settle. This vehicle combines raw power with unmatched sophistication, ensuring every mile is a memory.'}"
              </p>
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 w-full">
          <div className="bg-[#0b1c1c] rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 border border-white/10 shadow-2xl">
            {success ? (
              <div className="py-12 md:py-20 text-center animate-reveal">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#8ecd24] rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-xl">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-[#011111]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-4 uppercase italic text-white">Reservation Sent</h2>
                <p className="text-gray-400 text-sm md:text-base">Our team will contact you shortly to confirm your booking. Redirecting...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h2 className="text-xl md:text-2xl font-extrabold text-white uppercase italic">Complete Booking</h2>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-500 uppercase">Estimated Total</p>
                    <p className="text-xl font-black text-[#8ecd24]">${totalPrice.toFixed(2)}</p>
                  </div>
                </div>
                
                {submissionError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs md:text-sm font-bold animate-pulse">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {submissionError}
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                    <input required name="name_surname" value={formData.name_surname} onChange={handleInputChange} type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8ecd24] text-white text-sm" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
                      <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8ecd24] text-white text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Phone</label>
                      <input required name="phone_number" value={formData.phone_number} onChange={handleInputChange} type="tel" placeholder="+355..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8ecd24] text-white text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Pick-up</label>
                      <input required name="pickup_datetime" value={formData.pickup_datetime} onChange={handleInputChange} type="datetime-local" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8ecd24] text-white text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Return</label>
                      <input required name="return_datetime" value={formData.return_datetime} onChange={handleInputChange} type="datetime-local" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8ecd24] text-white text-sm" />
                    </div>
                  </div>

                  {/* Extras Section */}
                  {extras.length > 0 && (
                    <div className="pt-2 space-y-3">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Available Extras (per day)</label>
                      <div className="space-y-2">
                        {extras.map(extra => (
                          <div 
                            key={extra.id} 
                            onClick={() => handleExtraToggle(extra.id)}
                            className={`flex justify-between items-center p-3 md:p-4 rounded-xl border transition-all cursor-pointer ${selectedExtras.includes(extra.id) ? 'bg-[#8ecd24]/10 border-[#8ecd24] text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded flex items-center justify-center border ${selectedExtras.includes(extra.id) ? 'bg-[#8ecd24] border-[#8ecd24]' : 'bg-transparent border-gray-600'}`}>
                                {selectedExtras.includes(extra.id) && <svg className="w-3.5 h-3.5 text-[#011111]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                              </div>
                              <span className="text-xs md:text-sm font-semibold">{extra.name}</span>
                            </div>
                            <span className="text-[#8ecd24] font-bold text-[10px] md:text-xs">+$ {extra.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 grid grid-cols-2 gap-3 md:gap-4">
                    <label className={`relative cursor-pointer p-4 md:p-6 rounded-xl md:rounded-2xl border-2 border-dashed transition-all flex flex-col items-center gap-2 ${passportFront ? 'bg-[#8ecd24]/5 border-[#8ecd24]/40' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                      <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'front')} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
                      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-center leading-tight">{passportFront ? 'ID Front Loaded' : 'ID Front'}</span>
                    </label>
                    <label className={`relative cursor-pointer p-4 md:p-6 rounded-xl md:rounded-2xl border-2 border-dashed transition-all flex flex-col items-center gap-2 ${passportBack ? 'bg-[#8ecd24]/5 border-[#8ecd24]/40' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                      <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'back')} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
                      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-center leading-tight">{passportBack ? 'ID Back Loaded' : 'ID Back'}</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                   <button 
                    disabled={submitting}
                    className="w-full bg-[#8ecd24] text-[#011111] py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase text-xs md:text-sm tracking-widest hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl"
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-3">
                        <div className="w-4 h-4 border-2 border-[#011111] border-t-transparent rounded-full animate-spin"></div>
                        Syncing...
                      </span>
                    ) : `Secure Reservation • $${totalPrice.toFixed(2)}`}
                  </button>
                  <p className="text-[8px] md:text-[9px] text-gray-600 text-center uppercase tracking-widest font-bold mt-4">Verified & Encrypted Connection</p>
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
