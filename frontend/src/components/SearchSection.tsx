
import React, { useState } from 'react';
import type { SearchQuery } from '../types';
import { CAR_CATEGORIES } from '../constants';

interface SearchSectionProps {
  onSearch: (query: SearchQuery) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<SearchQuery>({
    pickupLocation: '',
    pickupDate: '',
    returnDate: '',
    carType: 'All',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="container mx-auto">
      <form 
        onSubmit={handleSubmit}
        className="glass p-8 rounded-3xl shadow-2xl flex flex-col lg:flex-row items-end gap-6 border-white/20"
      >
        <div className="w-full flex-1">
          <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-2">Location</label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="City, airport, or hotel"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/20"
              value={query.pickupLocation}
              onChange={(e) => setQuery({...query, pickupLocation: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="w-full lg:w-48">
          <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-2">Pick-up Date</label>
          <input 
            type="date" 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-primary/50 transition-all [color-scheme:dark]"
            value={query.pickupDate}
            onChange={(e) => setQuery({...query, pickupDate: e.target.value})}
            required
          />
        </div>

        <div className="w-full lg:w-48">
          <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-2">Return Date</label>
          <input 
            type="date" 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-primary/50 transition-all [color-scheme:dark]"
            value={query.returnDate}
            onChange={(e) => setQuery({...query, returnDate: e.target.value})}
            required
          />
        </div>

        <div className="w-full lg:w-48">
          <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-2">Car Type</label>
          <select 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer"
            value={query.carType}
            onChange={(e) => setQuery({...query, carType: e.target.value})}
          >
            {CAR_CATEGORIES.map(cat => (
              <option key={cat} value={cat} className="bg-dark">{cat}</option>
            ))}
          </select>
        </div>

        <button 
          type="submit"
          className="w-full lg:w-auto bg-primary text-dark px-8 py-4 rounded-xl font-bold hover:bg-white transition-all flex items-center justify-center space-x-2 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Find Cars</span>
        </button>
      </form>
    </div>
  );
};

export default SearchSection;
