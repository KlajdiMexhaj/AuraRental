
import React from 'react';

const Location: React.FC = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0b1c1c]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          
          {/* Info Side */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <span className="text-[#8ecd24] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Visit Our Showroom</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tighter uppercase">Our Headquarters</h2>
            
            <div className="space-y-8">
              <div className="group cursor-default">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#8ecd24]/10 flex items-center justify-center group-hover:bg-[#8ecd24] transition-colors">
                    <svg className="w-5 h-5 text-[#8ecd24] group-hover:text-[#011111]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <h4 className="text-white font-bold tracking-tight">Main Hub</h4>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed ml-14">
                  Rruga e Kavajës, Kompleksi Aura<br />
                  Tirana, Albania 1001
                </p>
              </div>

              <div className="group cursor-default">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#8ecd24]/10 flex items-center justify-center group-hover:bg-[#8ecd24] transition-colors">
                    <svg className="w-5 h-5 text-[#8ecd24] group-hover:text-[#011111]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <h4 className="text-white font-bold tracking-tight">Operating Hours</h4>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed ml-14">
                  Monday — Saturday: 08:00 - 20:00<br />
                  Sunday: Concierge Only (Available 24/7)
                </p>
              </div>

              <div className="group cursor-default">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#8ecd24]/10 flex items-center justify-center group-hover:bg-[#8ecd24] transition-colors">
                    <svg className="w-5 h-5 text-[#8ecd24] group-hover:text-[#011111]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <h4 className="text-white font-bold tracking-tight">Direct Line</h4>
                </div>
                <p className="text-[#8ecd24] font-black text-lg ml-14">+355 68 472 0777</p>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="lg:w-2/3 h-[500px] relative rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group">
             {/* Map Iframe Overlay for Dark Theme Effect */}
             <div className="absolute inset-0 pointer-events-none bg-[#011111]/10 mix-blend-multiply z-10"></div>
             <iframe 
               title="Aura Rental Location"
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.7891276088!2d19.8105749!3d41.3245465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135031061c0f06cf%3A0x7d800160a33a571c!2sTirana%2C%20Albania!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
               width="100%" 
               height="100%" 
               style={{ border: 0, filter: 'grayscale(1) invert(1) contrast(1.2) brightness(0.9)' }} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               className="grayscale transition-all duration-700 group-hover:grayscale-0"
             />
             <div className="absolute bottom-6 right-6 z-20">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#8ecd24] text-[#011111] px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-2xl"
                >
                  Get Directions
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
