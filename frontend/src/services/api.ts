
import type { Car, Reservation, ApiResponse, CarExtra, Destination } from '../types';

const BASE_URL = 'https://rentalaura.pythonanywhere.com/api';

const MOCK_CARS: Car[] = [
  {
    id: 1,
    name: "Mercedes AMG GT",
    price: "1230.00",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200",
    detail: "Experience the pinnacle of luxury and performance.\n- 0 to 100 in 3.2s\n- Hand-built engine\n- Panoramic sunroof",
    category: "Luxury",
    fuel: "Petrol",
    transmission: "Automatic",
    seats: 2,
    air_conditioning: true,
    doors: 2
  }
];

export async function fetchCars(): Promise<ApiResponse<Car>> {
  try {
    const response = await fetch(`${BASE_URL}/cars/`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.warn("Using mock car data - backend might be offline");
    return {
      count: MOCK_CARS.length,
      next: null,
      previous: null,
      results: MOCK_CARS
    };
  }
}

export async function fetchCarDetail(id: number): Promise<Car> {
  try {
    const response = await fetch(`${BASE_URL}/cars/${id}/`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    const car = MOCK_CARS.find(c => c.id === id);
    if (!car) throw new Error('Car not found');
    return car;
  }
}

export async function fetchCarExtras(): Promise<ApiResponse<CarExtra>> {
  try {
    const response = await fetch(`${BASE_URL}/car-extras/`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    return {
      count: 0,
      next: null,
      previous: null,
      results: []
    };
  }
}

export async function fetchDestinations(): Promise<ApiResponse<Destination>> {
  try {
    const response = await fetch(`${BASE_URL}/destination/`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    return {
      count: 0,
      next: null,
      previous: null,
      results: []
    };
  }
}

export async function createReservation(reservation: FormData): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/reservations/`, {
      method: 'POST',
      body: reservation,
    });
    if (!response.ok) {
        const errData = await response.json();
        throw new Error(JSON.stringify(errData));
    }
    return await response.json();
  } catch (error) {
    console.error("Reservation Error:", error);
    throw error;
  }
}

export async function fetchReservations(): Promise<ApiResponse<Reservation>> {
  try {
    const response = await fetch(`${BASE_URL}/reservations/`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    return { 
      count: 0, 
      next: null, 
      previous: null, 
      results: [] 
    };
  }
}
