
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchSection from './components/SearchSection';
import CarSection from './components/CarSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { MOCK_CARS } from './constants';
import type { Car, SearchQuery } from './types';

const App: React.FC = () => {

  const [filteredCars, setFilteredCars] = useState<Car[]>(MOCK_CARS);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query: SearchQuery) => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      let results = MOCK_CARS;
      if (query.carType !== 'All') {
        results = results.filter(car => car.category === query.carType);
      }
      // Simple text search for location (not really filtering cars, just simulating intent)
      console.log('Searching in:', query.pickupLocation);
      
      setFilteredCars(results);
      setIsLoading(false);
      
      // Scroll to results
      const carsSection = document.getElementById('cars');
      if (carsSection) {
        carsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        <section id="home">
          <Hero />
        </section>
        
        <div className="relative z-20 -mt-16 md:-mt-24 px-4">
          <SearchSection onSearch={handleSearch} />
        </div>

        <section id="cars" className="py-20">
          <CarSection cars={filteredCars} isLoading={isLoading} />
        </section>

        <section id="about" className="py-20 bg-black/30">
          <AboutSection />
        </section>

        <section id="contact" className="py-20">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
