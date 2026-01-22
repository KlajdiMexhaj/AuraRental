
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center rotate-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-dark -rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                  <circle cx="7" cy="17" r="2" />
                  <path d="M9 17h6" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <span className="text-xl font-heading font-extrabold tracking-tighter">
                LUXE<span className="text-primary">DRIVE</span>
              </span>
            </div>
            <p className="text-white/40 max-w-xs">Elevating every mile with sophistication and high-performance engineering.</p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-dark transition-all duration-300">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current opacity-70 mask-contain" style={{ maskImage: `url(https://cdn.simpleicons.org/${social})`, WebkitMaskImage: `url(https://cdn.simpleicons.org/${social})` }}></div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-white/40 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#cars" className="text-white/40 hover:text-primary transition-colors">Our Fleet</a></li>
              <li><a href="#about" className="text-white/40 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-white/40 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/40 hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-white/40 hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-white/40 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/40 hover:text-primary transition-colors">Insurance Details</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
            <p className="text-white/40 mb-4 text-sm">Subscribe for exclusive offers and updates.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address"
                className="bg-white/5 border border-white/10 rounded-l-xl py-3 px-4 w-full focus:outline-none focus:border-primary/50"
              />
              <button className="bg-primary text-dark px-4 rounded-r-xl font-bold hover:bg-white transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-xs text-white/30 uppercase tracking-widest font-bold">
          <p>&copy; 2024 LUXEDRIVE ELITE RENTALS. ALL RIGHTS RESERVED.</p>
          <p>Designed with excellence for the driven.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
