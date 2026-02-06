
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [dates, setDates] = useState({ pickup: '', return: '' });
  const now = new Date().toISOString().slice(0, 16);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (dates.pickup && dates.return) {
      navigate(`/cars?pickup=${dates.pickup}&return=${dates.return}`);
    } else {
      navigate('/cars');
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#0b1c1c] via-[#011111] to-[#011111]">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8ecd24]/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8ecd24]/20 bg-[#8ecd24]/5 text-[#8ecd24] text-[10px] font-bold tracking-[0.2em] uppercase mb-8 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8ecd24]"></span>
            Now Available in your city
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white leading-[0.9] mb-8 tracking-tighter">
            PRESTIGE RENTALS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8ecd24] via-white to-[#8ecd24] bg-[length:200%_auto] animate-gradient">REDEFINED</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Don't just arrive. Make an entrance with our curated collection of high-performance and luxury vehicles.
          </p>
        </div>

        {/* Search Widget */}
        <div className="max-w-4xl mx-auto">
          <form 
            onSubmit={handleSearch} 
            className="glass p-2 md:p-3 rounded-3xl border border-white/10 flex flex-col md:flex-row gap-3 shadow-2xl relative"
          >
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 px-2">
              <div className="relative group p-3 rounded-2xl bg-white/5 border border-transparent focus-within:border-[#8ecd24]/30 transition-all">
                <label className="block text-[10px] uppercase font-black text-gray-500 mb-1 tracking-widest group-focus-within:text-[#8ecd24]">Pick-up</label>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#8ecd24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <input 
                    type="datetime-local" 
                    min={now}
                    step={3600}
                    className="bg-transparent text-white w-full focus:outline-none text-sm font-medium"
                    value={dates.pickup}
                    onChange={(e) => setDates({...dates, pickup: e.target.value})}
                  />
                </div>
              </div>

              <div className="relative group p-3 rounded-2xl bg-white/5 border border-transparent focus-within:border-[#8ecd24]/30 transition-all">
                <label className="block text-[10px] uppercase font-black text-gray-500 mb-1 tracking-widest group-focus-within:text-[#8ecd24]">Return</label>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#8ecd24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <input 
                    type="datetime-local" 
                    min={dates.pickup || now}
                    step={3600}
                    className="bg-transparent text-white w-full focus:outline-none text-sm font-medium"
                    value={dates.return}
                    onChange={(e) => setDates({...dates, return: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="bg-[#8ecd24] text-[#011111] px-10 py-5 rounded-2xl font-black text-sm hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(142,205,36,0.3)]"
            >
              <span>Explore Fleet</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
          </form>
          
          <div className="mt-8 flex justify-center gap-12">
            <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="w-2 h-2 rounded-full bg-[#8ecd24]"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Instant Booking</span>
            </div>
            <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="w-2 h-2 rounded-full bg-[#8ecd24]"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest">24/7 Support</span>
            </div>
            <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="w-2 h-2 rounded-full bg-[#8ecd24]"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Free Cancellation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
