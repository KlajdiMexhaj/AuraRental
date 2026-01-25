import React, { useState } from 'react';
import type { SearchQuery } from '../types';

interface SearchSectionProps {
  onSearch: (query: SearchQuery) => void;
}
const TIME_OPTIONS = [
  '12:00 AM',
  '01:00 AM',
  '02:00 AM',
  '03:00 AM',
  '04:00 AM',
  '05:00 AM',
  '06:00 AM',
  '07:00 AM',
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
  '09:00 PM',
  '10:00 PM',
  '11:00 PM',
];
const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<SearchQuery>({
    pickupLocation: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmit}
        className="
  glass p-10 rounded-3xl shadow-2xl
  w-full max-w-7xl mx-auto
  flex flex-col xl:flex-row items-end
  gap-8 border-white/20
"
      >
        {/* Pickup Location */}
        <div className="w-full lg:w-56">
          <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-2">
            Pick-up Place
          </label>
          <select
            className="
              w-full
              bg-white/5 backdrop-blur-md
              border border-white/15
              rounded-2xl
              py-4 pl-4 pr-10
              text-white text-sm
              focus:outline-none
              focus:border-primary/60
              focus:ring-2 focus:ring-primary/20
              hover:border-white/30
              transition-all duration-200 ease-out
              appearance-none
              cursor-pointer
            "
            value={query.pickupLocation}
            onChange={(e) =>
              setQuery({ ...query, pickupLocation: e.target.value as 'Airport' | 'Hotel' })
            }
            required
          >
            <option value="" disabled className="bg-dark">
              Select location
            </option>
            <option value="Airport" className="bg-dark">Airport</option>
            <option value="Hotel" className="bg-dark">Hotel</option>
          </select>
        </div>

        {/* Pickup Date */}
        <div className="w-full lg:w-44">
          <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-2">
            Pick-up Date
          </label>
          <input
            type="date"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-primary/50 transition-all [color-scheme:dark]"
            value={query.pickupDate}
            onChange={(e) => setQuery({ ...query, pickupDate: e.target.value })}
            required
          />
        </div>

        {/* Pickup Time */}
        <div className="w-full xl:w-40">
          <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-2">
            Pick-up Time
          </label>
          <select
            className="
            w-full
            bg-white/5 backdrop-blur-md
            border border-white/15
            rounded-2xl
            py-4 pl-4 pr-10
            text-white text-sm
            focus:outline-none
            focus:border-primary/60
            focus:ring-2 focus:ring-primary/20
            hover:border-white/30
            transition-all duration-200 ease-out
            appearance-none
            cursor-pointer
          "
            value={query.pickupTime}
            onChange={(e) => setQuery({ ...query, pickupTime: e.target.value })}
            required
          >
            <option value="" disabled className="bg-dark">
              Select time
            </option>
            {TIME_OPTIONS.map(time => (
              <option key={time} value={time} className="bg-dark">
                {time}
              </option>
            ))}
          </select>
        </div>


        {/* Return Date */}
        <div className="w-full lg:w-44">
          <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-2">
            Return Date
          </label>
          <input
            type="date"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-primary/50 transition-all [color-scheme:dark]"
            value={query.returnDate}
            onChange={(e) => setQuery({ ...query, returnDate: e.target.value })}
            required
          />
        </div>

        {/* Return Time */}
        <div className="w-full xl:w-40">
          <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-2">
            Return Time
          </label>
          <select
            className="
            w-full
            bg-white/5 backdrop-blur-md
            border border-white/15
            rounded-2xl
            py-4 pl-4 pr-10
            text-white text-sm
            focus:outline-none
            focus:border-primary/60
            focus:ring-2 focus:ring-primary/20
            hover:border-white/30
            transition-all duration-200 ease-out
            appearance-none
            cursor-pointer
          "
            value={query.returnTime}
            onChange={(e) => setQuery({ ...query, returnTime: e.target.value })}
            required
          >
            <option value="" disabled className="bg-dark">
              Select time
            </option>
            {TIME_OPTIONS.map(time => (
              <option key={time} value={time} className="bg-dark">
                {time}
              </option>
            ))}
          </select>
        </div>


        {/* Submit */}
        <button
          type="submit"
          className="w-full lg:w-auto bg-primary text-dark px-8 py-4 rounded-xl font-bold hover:bg-white transition-all flex items-center justify-center space-x-2 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 group-hover:scale-110 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default SearchSection;
