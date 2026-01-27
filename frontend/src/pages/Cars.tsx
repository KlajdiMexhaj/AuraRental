import React, { useEffect, useState } from "react";
import CarSection from "../components/CarSection";
import type { Car } from "../types";

const API_URL = "http://127.0.0.1:8000/api/cars/";

const Cars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        // DRF pagination: extract results array
        setCars(data.results || []);
      } catch (err) {
        console.error("Failed to fetch cars:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <section className="py-32">
      <CarSection cars={cars} isLoading={isLoading} />
    </section>
  );
};

export default Cars;
