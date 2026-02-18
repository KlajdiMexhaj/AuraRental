
import React from 'react';
import { Link } from 'react-router-dom';
import type { Car } from '../types';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const imageUrl = car.image?.startsWith('http') 
    ? car.image 
    : car.image 
      ? `http://127.0.0.1:8000/${car.image}`
      : 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200';

  return (
<div className="group relative glass rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:border-[#8ecd24]/40 hover:-translate-y-2 bg-[#0b1c1c]/50">
  {/* Glow Effect on Hover */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#8ecd24]/0 to-[#8ecd24]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
  
  <div className="relative aspect-[16/10] overflow-hidden">
    <img 
      src={imageUrl} 
      alt={car.name} 
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
    />
    
    {/* Price Tag */}
    <div className="absolute bottom-5 right-5">
      <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 flex items-baseline gap-1">
        <span className="text-[#8ecd24] font-black text-xl">€{car.price}</span>
        <span className="text-gray-400 text-[9px] font-black uppercase tracking-widest">/ Day</span>
      </div>
    </div>
  </div>
  
  <div className="p-6 relative z-10">
    {/* Header */}
    <div className="mb-6">
      <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">
        {car.name}
      </h3>
      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
        <span className="w-4 h-[1px] bg-gray-700"></span>
        {car.category || 'or Same car of this category'}
      </p>
    </div>
    
    {/* Specs Grid: Updated to 6 items */}
    <div className="grid grid-cols-2 auto-rows-fr gap-3 mb-6">
      
      {/* 1. Transmission */}
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 transition-colors">
         <div className="w-8 h-8 rounded-xl bg-[#8ecd24]/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-[#8ecd24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
         </div>
         <span className="text-gray-400 text-[10px] font-black uppercase tracking-tight">{car.transmission || 'Auto'}</span>
      </div>

      {/* 2. Fuel Type */}
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 transition-colors">
         <div className="w-8 h-8 rounded-xl bg-[#8ecd24]/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-[#8ecd24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
         </div>
         <span className="text-gray-400 text-[10px] font-black uppercase tracking-tight">{car.fuel_type || 'Hybrid'}</span>
      </div>

      {/* 3. Seats */}
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 transition-colors">
         <div className="w-8 h-8 rounded-xl bg-[#8ecd24]/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-[#8ecd24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857"></path></svg>
         </div>
         <span className="text-gray-400 text-[10px] font-black uppercase tracking-tight">{car.seats || '5'} Seats</span>
      </div>

      {/* 4. Doors (NEW) */}
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 transition-colors">
         <div className="w-8 h-8 rounded-xl bg-[#8ecd24]/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-[#8ecd24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10M5 10V5a2 2 0 012-2h10a2 2 0 012 2v5"></path></svg>
         </div>
         <span className="text-gray-400 text-[10px] font-black uppercase tracking-tight">{car.doors || '4'} Doors</span>
      </div>

      {/* 5. Air Conditioning (NEW) */}
      <div className="col-span-1 flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 transition-colors">
         <div className="w-8 h-8 rounded-xl bg-[#8ecd24]/10 flex items-center justify-center flex-shrink-0">
            {/* Snowflake Icon */}
            <svg className="w-4 h-4 text-[#8ecd24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v18m9-9H3m15.364-6.364l-12.728 12.728m12.728 0L5.272 5.636"></path></svg>
         </div>
         <span className="text-gray-400 text-[10px] font-black uppercase tracking-tight">
           {car.air_conditioning ? 'A/C Active' : 'No A/C'}
         </span>
      </div>



    </div>

    {/* Action Button */}
    <Link 
      to={`/car/${car.id}`}
      className="group/btn relative w-full flex items-center justify-center bg-white/[0.05] border border-white/10 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-[#8ecd24] hover:text-[#011111] hover:border-[#8ecd24]"
    >
      <span className="relative z-10 flex items-center gap-2">
        BOOK NOW
        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </span>
    </Link>
  </div>
</div>
  );
};

export default CarCard;
