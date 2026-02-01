
import type { Car, Reservation, ApiResponse, CarExtra } from '../types';

const BASE_URL = 'http://127.0.0.1:8000/api';

const MOCK_CARS: Car[] = [
  {
    id: 1,
    name: "Mercedes AMG GT",
    price: "1230.00",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200",
    description: "Experience the pinnacle of luxury and performance.",
    category: "Luxury",
    fuel: "Petrol",
    transmission: "Automatic",
    seats: 2
  },
  {
    id: 2,
    name: "Audi RS6 Avant",
    price: "850.00",
    image: "https://images.unsplash.com/photo-1606152424101-ad4492a0249c?auto=format&fit=crop&q=80&w=1200",
    description: "The perfect blend of utility and brutal power.",
    category: "Sport Estate",
    fuel: "Hybrid",
    transmission: "Automatic",
    seats: 5
  },
  {
    id: 3,
    name: "Porsche 911 Carrera",
    price: "1100.00",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
    description: "An icon of automotive engineering.",
    category: "Coupe",
    fuel: "Petrol",
    transmission: "Manual/PDK",
    seats: 2
  }
];

const MOCK_EXTRAS: CarExtra[] = [
  {
    id: 1,
    name: "Siguracion kasko",
    price: "20.00"
  },
  {
    id: 2,
    name: "Shofer shtese",
    price: "3.00"
  }
];

const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: 1,
    name_surname: "Klajdi Mexhaj",
    phone_number: "+355684720777",
    email: "mexhajklajdi@gmail.com",
    pickup_datetime: "2026-01-29T23:00:00Z",
    return_datetime: "2026-01-31T23:00:00Z",
    status: "approved",
    car: 1
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
      count: MOCK_EXTRAS.length,
      next: null,
      previous: null,
      results: MOCK_EXTRAS
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
      count: MOCK_RESERVATIONS.length, 
      next: null, 
      previous: null, 
      results: MOCK_RESERVATIONS 
    };
  }
}
