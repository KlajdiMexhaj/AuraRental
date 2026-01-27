import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import SearchSection from "../components/SearchSection";
import CarSection from "../components/CarSection";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import type { Car, SearchQuery } from "../types";

const API_URL = "http://127.0.0.1:8000/api/cars/";

const Home: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        // DRF pagination: extract results array
        const carList: Car[] = data.results || [];
        setCars(carList);
        setFilteredCars(carList);
      } catch (err) {
        console.error("Failed to fetch cars:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleSearch = (query: SearchQuery) => {
    setIsLoading(true);

    // Example: filter by name (replace with your search logic)
    setTimeout(() => {
    //   const filtered = cars.filter(car =>
    //     car.name?.toLowerCase().includes(query.carType?.toLowerCase() || "")
    //   );
    //   setFilteredCars(filtered);
    //   setIsLoading(false);

      // Scroll to cars section
      document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" });
    }, 600);
  };

  return (
    <>
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
    </>
  );
};

export default Home;
