import React from 'react';
import type { Car } from '../types';
import { useNavigate } from 'react-router-dom';
interface CarSectionProps {
  cars: Car[];
  isLoading: boolean;
}

const CarSection: React.FC<CarSectionProps> = ({ cars, isLoading }) => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-4">
            Our Elite <span className="text-primary">Fleet</span>
          </h2>
          <p className="text-white/50 max-w-lg">
            Choose from our handpicked selection of premium vehicles, meticulously maintained.
          </p>
        </div>

        <span className="text-sm font-medium text-white/40">
          Showing {cars.length} cars
        </span>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white/5 rounded-3xl h-[450px] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map(car => (
            <div
              key={car.id}
              className="group glass rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(142,205,36,0.1)] flex flex-col"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={car?.image || "/placeholder.png"}
                  alt={car?.name || "Car"}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                {/* STATIC category */}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/20 backdrop-blur-md text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-primary/30">
                    Premium
                  </span>
                </div>

                {/* STATIC rating */}
                <div className="absolute top-4 right-4 bg-dark/50 backdrop-blur-sm text-white text-sm font-bold px-3 py-1 rounded-lg flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.9</span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{car.name}</h3>
                  <span className="text-sm text-white/40">2024</span>
                </div>

                {/* Description from backend */}
                <p className="text-sm text-white/50 mb-6 line-clamp-3">
                  {car?.detail || "No description"}
                </p>

                {/* STATIC specs */}
                <div className="flex items-center space-x-4 mb-6 text-sm text-white/50">
                  <span>Automatic</span>
                  <span>5 Seats</span>
                </div>

                {/* Price */}
                <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      ${car.price}
                    </span>
                    <span className="text-white/40 text-sm"> / day</span>
                  </div>
                  <button
                  onClick={() => navigate(`/cars/${car.id}`)}
                  className="bg-white/10 hover:bg-primary hover:text-dark px-6 py-2 rounded-xl text-sm font-bold transition-all">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!isLoading && cars.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold mb-2">No cars found</h3>
          <p className="text-white/40">Try adjusting your search.</p>
        </div>
      )}
    </div>
  );
};

export default CarSection;
