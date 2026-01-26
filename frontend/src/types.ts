
export interface Car {
  id: number;
  name: string;
  image: string;
  detail: string;
  price: number;
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
