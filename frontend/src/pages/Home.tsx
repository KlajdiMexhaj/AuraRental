
import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import CarCard from '../components/CarCard';
import About from '../components/About';
import Location from '../components/Location';
import Footer from '../components/Footer';
import { fetchCars } from '../services/api';
import type { Car } from '../types';
import { Link,useLocation } from 'react-router-dom';
import Reviews from '../components/REviews';
const Home: React.FC = () => {
  const location = useLocation();

useEffect(() => {
  if (location.hash) {
    const el = document.getElementById(location.hash.replace('#', ''));
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
}, [location]);
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await fetchCars();
        setFeaturedCars(data.results.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCars();
  }, []);

  return (
    <div className="bg-[#011111] overflow-hidden">
      <Hero />
      
      {/* Featured Fleet Preview */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[#8ecd24] text-[10px] font-black tracking-[0.4em] uppercase mb-4 block animate-fade-in">Exclusive Collection</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase">Our Featured Fleet</h2>
          </div>
          <Link to="/cars" className="text-[#8ecd24] font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 group">
            <span>View Full Collection</span>
            <div className="w-10 h-10 rounded-full border border-[#8ecd24]/30 flex items-center justify-center group-hover:bg-[#8ecd24] group-hover:text-[#011111] transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </div>
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 border-4 border-[#8ecd24] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">Accessing Vault...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>

      <About />
      <Reviews />
      <Location />
      <Footer />
    </div>
  );
};

export default Home;
