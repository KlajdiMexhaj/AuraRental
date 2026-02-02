
import React from 'react';
import { Link } from 'react-router-dom';
import type { Car } from '../types';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const imageUrl = car.image
  ? car.image.startsWith('http')
    ? car.image
    : `http://127.0.0.1:8000${car.image}`
  : '/vite.svg';

  return (
    <div className="group relative glass rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:border-[#8ecd24]/40 hover:-translate-y-2">
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8ecd24]/0 to-[#8ecd24]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      <div className="relative aspect-[16/11] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={car.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
        <div className="absolute top-6 right-6">
          <div className="bg-black/60 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-2">
            <span className="text-[#8ecd24] font-black text-lg">${car.price}</span>
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">/day</span>
          </div>
        </div>
        <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
          <span className="bg-[#8ecd24] text-[#011111] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter">Available Now</span>
        </div>
      </div>
      
      <div className="p-8 relative z-10 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{car.name}</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
             <div className="w-8 h-8 rounded-lg bg-[#8ecd24]/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#8ecd24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
             </div>
             <span className="text-gray-400 text-[11px] font-bold uppercase">{car.transmission || 'Automatic'}</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
             <div className="w-8 h-8 rounded-lg bg-[#8ecd24]/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#8ecd24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
             </div>
             <span className="text-gray-400 text-[11px] font-bold uppercase">{car.fuel || 'Hybrid'}</span>
          </div>
        </div>

        <Link 
          to={`/car/${car.id}`}
          className="group/btn relative overflow-hidden bg-white/5 border border-white/10 text-white py-5 rounded-[1.25rem] text-center font-bold text-sm transition-all hover:bg-[#8ecd24] hover:text-[#011111] hover:border-[#8ecd24] overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            View Reservation
            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
