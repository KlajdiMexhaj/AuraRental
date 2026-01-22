
import React from 'react';
import type { Car } from '../types';

interface CarSectionProps {
  cars: Car[];
  isLoading: boolean;
}

const CarSection: React.FC<CarSectionProps> = ({ cars, isLoading }) => {
  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-4">Our Elite <span className="text-primary">Fleet</span></h2>
          <p className="text-white/50 max-w-lg">Choose from our handpicked selection of premium vehicles, meticulously maintained for your driving pleasure.</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-white/40">Showing {cars.length} cars</span>
          <div className="flex bg-white/5 p-1 rounded-lg">
            <button className="p-2 hover:text-primary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg></button>
            <button className="p-2 text-primary bg-white/10 rounded shadow-inner"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white/5 rounded-3xl h-[450px] animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map(car => (
            <div key={car.id} className="group glass rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(142,205,36,0.1)] flex flex-col">
              {/* Car Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={car.image} 
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/20 backdrop-blur-md text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-primary/30">
                    {car.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-dark/50 backdrop-blur-sm text-white text-sm font-bold px-3 py-1 rounded-lg flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span>{car.rating}</span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{car.brand} {car.model}</h3>
                  <span className="text-sm text-white/40">{car.year}</span>
                </div>
                
                <div className="flex items-center space-x-4 mb-6 text-sm text-white/50">
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span>{car.seats} Seats</span>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">${car.pricePerDay}</span>
                    <span className="text-white/40 text-sm"> / day</span>
                  </div>
                  <button className="bg-white/10 hover:bg-primary hover:text-dark px-6 py-2 rounded-xl text-sm font-bold transition-all">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {cars.length === 0 && !isLoading && (
        <div className="text-center py-20">
          <div className="mb-6 inline-block p-4 rounded-full bg-white/5">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">No cars found</h3>
          <p className="text-white/40">Try adjusting your filters to find your perfect ride.</p>
        </div>
      )}
    </div>
  );
};

export default CarSection;
