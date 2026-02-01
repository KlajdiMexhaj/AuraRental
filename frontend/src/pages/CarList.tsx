
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchCars, fetchReservations } from '../services/api';
import type { Car, Reservation } from '../types';
import CarCard from '../components/CarCard';

const CarList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [carsData, reservationsData] = await Promise.all([
          fetchCars(),
          fetchReservations()
        ]);

        let filteredCars = carsData.results;
        
        const pickupParam = searchParams.get('pickup');
        const returnParam = searchParams.get('return');

        if (pickupParam && returnParam) {
          const searchStart = new Date(pickupParam).getTime();
          const searchEnd = new Date(returnParam).getTime();

          if (!isNaN(searchStart) && !isNaN(searchEnd)) {
            // Logic: Hide car if any approved/pending reservation overlaps
            // Overlap: (resStart < searchEnd) && (resEnd > searchStart)
            filteredCars = filteredCars.filter(car => {
              const carReservations = reservationsData.results.filter(res => res.car === car.id && res.status !== 'rejected');
              const hasConflict = carReservations.some(res => {
                const resStart = new Date(res.pickup_datetime).getTime();
                const resEnd = new Date(res.return_datetime).getTime();
                return (resStart < searchEnd) && (resEnd > searchStart);
              });
              return !hasConflict;
            });
          }
        }

        setCars(filteredCars);
      } catch (err) {
        setError('Failed to load fleet. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [searchParams]);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">OUR COLLECTION</h1>
        <p className="text-gray-500 max-w-2xl text-lg">
          {searchParams.get('pickup') 
            ? "Showing cars available for your selected dates." 
            : "From high-performance sports cars to luxurious sedans, discover the perfect vehicle for your journey."
          }
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <div className="w-16 h-16 border-4 border-[#8ecd24] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#8ecd24] font-medium animate-pulse">Scanning our fleet...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-[#0b1c1c] rounded-3xl border border-red-500/20">
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-[#8ecd24] text-[#011111] px-6 py-2 rounded-full font-bold">Try Again</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
          {cars.length === 0 && (
            <div className="col-span-full text-center py-32 bg-[#0b1c1c] rounded-[40px] border border-white/5">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Cars Available</h3>
              <p className="text-gray-500">Try adjusting your dates or browsing our full collection.</p>
              <button 
                onClick={() => window.history.pushState({}, '', '/#/cars')} 
                className="mt-8 text-[#8ecd24] font-bold underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CarList;
