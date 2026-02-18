import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  
  // Initialize with today's date
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    pickupDate: today,
    pickupTime: '10:00',
    returnDate: today,
    returnTime: '10:00',
  });

  // Generate hours from 01:00 to 24:00
  const hours = Array.from({ length: 24 }, (_, i) => {
    const h = i + 1;
    return `${h.toString().padStart(2, '0')}:00`;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const pickup = `${formData.pickupDate}T${formData.pickupTime}`;
    const returnDt = `${formData.returnDate}T${formData.returnTime}`;
    navigate(`/cars?pickup=${pickup}&return=${returnDt}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#0b1c1c] via-[#011111] to-[#011111]">
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
            Don’t just arrive. Make an entrance with our curated collection of high-performance and economical vehicles.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <form 
            onSubmit={handleSearch} 
            className="glass p-3 rounded-[32px] border border-white/10 flex flex-col lg:flex-row gap-4 shadow-2xl relative"
          >
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pick-up Group */}
              <div className="group p-4 rounded-2xl bg-white/5 border border-transparent focus-within:border-[#8ecd24]/30 transition-all">
                <label className="block text-[10px] uppercase font-black text-gray-500 mb-2 tracking-widest group-focus-within:text-[#8ecd24]">Pick-up date & time</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="date" 
                    min={today}
                    className="bg-transparent text-white w-full focus:outline-none text-sm font-medium [color-scheme:dark]"
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                  />
                  <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
                  <select 
                    className="bg-transparent text-white focus:outline-none text-sm font-medium cursor-pointer"
                    value={formData.pickupTime}
                    onChange={(e) => setFormData({...formData, pickupTime: e.target.value})}
                  >
                    {hours.map(h => <option key={h} value={h} className="bg-[#0b1c1c] text-white">{h}</option>)}
                  </select>
                </div>
              </div>

              {/* Return Group */}
              <div className="group p-4 rounded-2xl bg-white/5 border border-transparent focus-within:border-[#8ecd24]/30 transition-all">
                <label className="block text-[10px] uppercase font-black text-gray-500 mb-2 tracking-widest group-focus-within:text-[#8ecd24]">Return date & time</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="date" 
                    min={formData.pickupDate || today}
                    className="bg-transparent text-white w-full focus:outline-none text-sm font-medium [color-scheme:dark]"
                    value={formData.returnDate}
                    onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
                  />
                  <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
                  <select 
                    className="bg-transparent text-white focus:outline-none text-sm font-medium cursor-pointer"
                    value={formData.returnTime}
                    onChange={(e) => setFormData({...formData, returnTime: e.target.value})}
                  >
                    {hours.map(h => <option key={h} value={h} className="bg-[#0b1c1c] text-white">{h}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="bg-[#8ecd24] text-[#011111] px-12 py-5 lg:py-0 rounded-2xl font-black text-sm hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(142,205,36,0.3)]"
            >
              <span>EXPLORE FLEET</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
          </form>
          
          <div className="mt-8 flex flex-wrap justify-center gap-8 md:gap-12">
            {['Instant Booking', '24/7 Support', 'Free Cancellation'].map((text) => (
              <div key={text} className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all cursor-default">
                <span className="w-2 h-2 rounded-full bg-[#8ecd24]"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;