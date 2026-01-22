
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Car Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/80 to-dark"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>Premium Car Rental 2024</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold mb-6 leading-tight">
            Elevate Your <span className="text-gradient">Journey</span> Beyond Boundaries.
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-xl">
            Experience the pinnacle of automotive excellence. Rent the world's most exclusive cars with seamless service and tailored experiences.
          </p>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="w-full sm:w-auto bg-primary text-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(142,205,36,0.3)]">
              Browse Fleet
            </button>
            <button className="w-full sm:w-auto px-10 py-4 rounded-full font-bold text-lg border border-white/20 hover:bg-white/10 transition-all">
              Our Services
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements/Stats */}
      <div className="hidden lg:flex absolute bottom-32 right-32 flex-col space-y-6">
        <div className="glass p-6 rounded-2xl flex items-center space-x-4 transform hover:-translate-y-2 transition-transform cursor-default">
          <div className="text-4xl font-bold text-primary">500+</div>
          <div className="text-xs uppercase tracking-widest text-white/50">Happy<br/>Clients</div>
        </div>
        <div className="glass p-6 rounded-2xl flex items-center space-x-4 translate-x-12 transform hover:-translate-y-2 transition-transform cursor-default">
          <div className="text-4xl font-bold text-primary">45+</div>
          <div className="text-xs uppercase tracking-widest text-white/50">Luxury<br/>Models</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
