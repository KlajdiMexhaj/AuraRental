
import React from 'react';

const AboutSection: React.FC = () => {
  const features = [
    {
      title: 'Global Delivery',
      desc: 'We deliver your dream car to your doorstep, anywhere in the world.',
      icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    },
    {
      title: '24/7 Support',
      desc: 'Our dedicated concierge team is always available to assist you.',
      icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
    },
    {
      title: 'Premium Insurance',
      desc: 'Comprehensive coverage included with every luxury rental.',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left: Content */}
        <div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-8 leading-tight">
            We Redefine The <span className="text-gradient">Luxury Car</span> Experience.
          </h2>
          <p className="text-lg text-white/60 mb-10 leading-relaxed">
            Founded with a passion for automotive excellence, LuxeDrive has grown to become the world's leading provider of premium vehicle reservations. We don't just rent cars; we curate unforgettable journeys for those who demand the best.
          </p>
          
          <div className="space-y-8">
            {features.map((f, i) => (
              <div key={i} className="flex items-start space-x-6">
                <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{f.title}</h4>
                  <p className="text-white/50">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visual */}
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-[100px]"></div>
          
          <div className="relative rounded-3xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10 group">
            <img 
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200" 
              alt="Luxury Experience" 
              className="w-full h-auto grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-8 left-8 right-8">
              <div className="glass p-6 rounded-2xl border-white/20">
                <p className="italic text-lg mb-4 text-white/90 font-medium">"The attention to detail and fleet selection at LuxeDrive is simply unmatched. It's my go-to for every business trip."</p>
                <div className="flex items-center space-x-3">
                  <img src="https://picsum.photos/seed/luxedrive/100/100" className="w-10 h-10 rounded-full border-2 border-primary" alt="CEO" />
                  <div>
                    <p className="font-bold text-sm">Marcus V. Sterling</p>
                    <p className="text-xs text-primary font-bold">Fortune 500 Executive</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
