
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b1c1c] pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#8ecd24] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(142,205,36,0.3)]">
                <span className="text-[#011111] font-black text-xl">A</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white flex flex-col leading-none">
                AURA <span className="text-[#8ecd24] text-[10px] tracking-[0.4em] font-black uppercase">Rental</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Redefining luxury mobility. We provide an exclusive fleet for those who demand performance, style, and perfection in every mile.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Navigation</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-500 hover:text-[#8ecd24] transition-colors text-sm font-medium">Home Discover</Link></li>
              <li><Link to="/cars" className="text-gray-500 hover:text-[#8ecd24] transition-colors text-sm font-medium">Luxury Fleet</Link></li>
              <li><a href="#about" className="text-gray-500 hover:text-[#8ecd24] transition-colors text-sm font-medium">Our Story</a></li>
              <li><a href="#contact" className="text-gray-500 hover:text-[#8ecd24] transition-colors text-sm font-medium">Location Hub</a></li>
            </ul>
          </div>

          {/* Quick Support */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Client Services</h4>
            <ul className="space-y-4">
              <li><span className="text-gray-500 hover:text-[#8ecd24] transition-colors text-sm font-medium cursor-pointer">Rental Policies</span></li>
              <li><span className="text-gray-500 hover:text-[#8ecd24] transition-colors text-sm font-medium cursor-pointer">Insurance Coverage</span></li>
              <li><span className="text-gray-500 hover:text-[#8ecd24] transition-colors text-sm font-medium cursor-pointer">VIP Concierge</span></li>
              <li><span className="text-gray-500 hover:text-[#8ecd24] transition-colors text-sm font-medium cursor-pointer">Fleet Management</span></li>
            </ul>
          </div>

          {/* Social Presence */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Social Presence</h4>
            <div className="flex gap-4">
               {[
                 { name: 'WhatsApp', icon: 'M12 2C6.48 2 2 6.48 2 12c0 1.94.57 3.75 1.55 5.27L2.1 21.9l4.75-1.45C8.25 21.43 10.06 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.74 0-3.37-.53-4.73-1.44l-.34-.23-2.82.86.87-2.75-.25-.37C3.53 14.88 3 13.49 3 12c0-4.96 4.04-9 9-9s9 4.04 9 9-4.04 9-9 9z', link: 'https://wa.me/355684720777' },
                 { name: 'Instagram', icon: 'M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.75-1a.75.75 0 110 1.5.75.75 0 010-1.5z', link: 'https://instagram.com/aura_rental' },
                 { name: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z', link: 'https://facebook.com/aura_rental' }
               ].map((social) => (
                 <a 
                   key={social.name}
                   href={social.link} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#8ecd24] hover:text-[#011111] transition-all group"
                 >
                   <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d={social.icon}></path></svg>
                 </a>
               ))}
            </div>
            <p className="mt-6 text-[10px] text-gray-600 font-bold uppercase tracking-widest">Follow for daily exclusive fleet drops</p>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">© 2024 Aura Rental. Prestige Mobility Group.</p>
          <div className="flex gap-8 text-[10px] text-gray-700 font-black uppercase tracking-widest">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-white transition-colors cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
