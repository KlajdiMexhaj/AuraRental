
export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  image: string;
  category: 'Luxury' | 'SUV' | 'Sport' | 'Electric';
  transmission: 'Automatic' | 'Manual';
  fuel: 'Petrol' | 'Electric' | 'Hybrid';
  seats: number;
  rating: number;
}

export interface SearchQuery {
  pickupLocation: 'Airport' | 'Hotel' | '';
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
