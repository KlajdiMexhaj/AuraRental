import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Car } from '../types';

const API_URL = 'http://127.0.0.1:8000/api/cars/';
const RESERVATION_API_URL = 'http://127.0.0.1:8000/api/reservations/';

const CarDetails: React.FC = () => {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name_surname: '',
    phone_number: '',
    email: '',
    pickup_datetime: '',
    return_datetime: '',
    passport_front: null as File | null,
    passport_back: null as File | null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch(`${API_URL}${id}/`)
      .then(res => res.json())
      .then(data => {
        setCar(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!car) return;

    const data = new FormData();
    data.append('car', car.id.toString());
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value as any);
    });

    try {
      const res = await fetch(RESERVATION_API_URL, {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        setSuccess('Reservation submitted successfully!');
        setError('');
        setFormData({
          name_surname: '',
          phone_number: '',
          email: '',
          pickup_datetime: '',
          return_datetime: '',
          passport_front: null,
          passport_back: null,
        });
        setShowModal(false);
      } else {
        const errData = await res.json();
        setError(JSON.stringify(errData));
        setSuccess('');
      }
    } catch (err) {
      setError('Something went wrong!');
      setSuccess('');
    }
  };

  if (isLoading) return <div className="py-40 text-center">Loading...</div>;
  if (!car) return <div className="py-40 text-center">Car not found</div>;

  return (
    <section className="py-32 container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <img
          src={car?.image || '/placeholder.png'}
          alt={car?.name || 'Car'}
          className="rounded-3xl object-cover w-full h-[420px]"
        />

        {/* Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{car.name}</h1>
          <p className="text-white/60 mb-6">{car.detail}</p>

          <div className="flex space-x-6 text-sm text-white/50 mb-8">
            <span>Automatic</span>
            <span>5 Seats</span>
            <span>Premium</span>
          </div>

          <div className="text-3xl font-bold text-primary mb-6">
            ${car.price} <span className="text-sm text-white/40">/ day</span>
          </div>

          <button
            className="bg-primary text-dark px-8 py-3 rounded-xl font-bold"
            onClick={() => setShowModal(true)}
          >
            Book Now
          </button>
        </div>
      </div>

{/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl w-full max-w-lg relative shadow-2xl border border-gray-700/50">
            <button
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700/50"
              onClick={() => setShowModal(false)}
            >
              <span className="text-2xl leading-none">×</span>
            </button>
            
            <h2 className="text-3xl font-bold mb-2 text-white">Book {car.name}</h2>
            <p className="text-gray-400 mb-6">Fill in your details to reserve this vehicle</p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl mb-4">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-xl mb-4">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Full Name</label>
                <input
                  type="text"
                  name="name_surname"
                  placeholder="John Doe"
                  value={formData.name_surname}
                  onChange={handleChange}
                  className="p-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Phone Number</label>
                <input
                  type="text"
                  name="phone_number"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="p-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Pickup Date & Time</label>
                  <input
                    type="datetime-local"
                    name="pickup_datetime"
                    value={formData.pickup_datetime}
                    onChange={handleChange}
                    className="p-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Return Date & Time</label>
                  <input
                    type="datetime-local"
                    name="return_datetime"
                    value={formData.return_datetime}
                    onChange={handleChange}
                    className="p-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Passport Front</label>
                  <input
                    type="file"
                    name="passport_front"
                    onChange={handleChange}
                    className="p-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:cursor-pointer file:transition-all"
                    accept="image/*"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Passport Back</label>
                  <input
                    type="file"
                    name="passport_back"
                    onChange={handleChange}
                    className="p-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:cursor-pointer file:transition-all"
                    accept="image/*"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-dark px-6 py-4 rounded-xl font-bold mt-6 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
              >
                Submit Reservation
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default CarDetails;
