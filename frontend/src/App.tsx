import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchSection from './components/SearchSection';
import CarSection from './components/CarSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import type { Car, SearchQuery } from './types';

const API_URL = 'http://127.0.0.1:8000/api/cars/';

const App: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /* -------------------- FETCH CARS FROM BACKEND -------------------- */
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then((data: Car[]) => {
        setCars(data);
        setFilteredCars(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
        setIsLoading(false);
      });
  }, []);

  /* -------------------- SEARCH HANDLER -------------------- */
  const handleSearch = (query: SearchQuery) => {
    setIsLoading(true);

    // You can later send `query` to backend
    setTimeout(() => {
      console.log('Searching in:', query.pickupLocation);
      console.log('Pickup:', query.pickupDate, query.pickupTime);
      console.log('Return:', query.returnDate, query.returnTime);

      // For now: no filtering, show all cars
      setFilteredCars(cars);
      setIsLoading(false);

      const carsSection = document.getElementById('cars');
      carsSection?.scrollIntoView({ behavior: 'smooth' });
    }, 600);
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
