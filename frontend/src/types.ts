
export interface Car {
  id: number;
  name: string;
  price: string;
  image: string;
  description?: string;
  category?: string;
  fuel?: string;
  transmission?: string;
  seats?: number;
}

export interface CarExtra {
  id: number;
  name: string;
  price: string;
}

export interface Reservation {
  id?: number;
  name_surname: string;
  phone_number: string;
  email: string;
  pickup_datetime: string;
  return_datetime: string;
  passport_front?: File | string | null;
  passport_back?: File | string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  car: number;
  extras?: number[];
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface SearchCriteria {
  pickupDate: string;
  returnDate: string;
}
