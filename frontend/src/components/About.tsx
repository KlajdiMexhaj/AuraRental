
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#8ecd24]/20 blur-3xl rounded-full"></div>
             <img 
               src="https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800" 
               alt="Our Mission" 
               className="relative z-10 w-full rounded-[40px] shadow-2xl border border-white/10"
             />
             <div className="absolute -bottom-6 -right-6 bg-[#8ecd24] p-8 rounded-3xl z-20 hidden md:block">
               <span className="block text-4xl font-black text-[#011111]">10+</span>
               <span className="text-xs uppercase font-bold text-[#011111]/70">Years Experience</span>
             </div>
          </div>
          
          <div>
            <span className="text-[#8ecd24] text-xs font-bold tracking-widest uppercase mb-4 block">About Aura Rental</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              REDEFINING THE <br /> CAR RENTAL EXPERIENCE
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Founded in 2014, Aura Rental has become the premier destination for luxury vehicle rentals. Our journey started with a simple belief: that renting a car should be as exhilarating as driving one.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#8ecd24]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#8ecd24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h4 className="text-white font-bold">White Glove Service</h4>
                <p className="text-gray-500 text-sm">Concierge-style delivery and pick-up at your preferred location.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#8ecd24]/10 rounded-xl flex items-center justify-center">
                   <svg className="w-6 h-6 text-[#8ecd24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h4 className="text-white font-bold">Pristine Fleet</h4>
                <p className="text-gray-500 text-sm">Every vehicle undergoes rigorous multi-point inspection and sanitization.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
