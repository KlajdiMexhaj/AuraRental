import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const handleDiscoverClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b1c1c] pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" onClick={handleDiscoverClick} className="flex items-center space-x-3">
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
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">
              Navigation
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  onClick={handleDiscoverClick}
                  className="text-gray-500 hover:text-[#8ecd24] transition-colors text-sm font-medium"
                >
                  Discover
                </Link>
              </li>
              <li>
                <Link
                  to="/cars"
                  className="text-gray-500 hover:text-[#8ecd24] transition-colors text-sm font-medium"
                >
                  Our Fleet
                </Link>
              </li>
              <li>
                <a
                  href="/#about"
                  className="text-gray-500 hover:text-[#8ecd24] transition-colors text-sm font-medium"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="text-gray-500 hover:text-[#8ecd24] transition-colors text-sm font-medium"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Client Services */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">
              Client Services
            </h4>
            <ul className="space-y-4">
              <li><span className="text-gray-500 transition-colors text-sm font-medium">Policies</span></li>
              <li><span className="text-gray-500 transition-colors text-sm font-medium">Insurance</span></li>
              <li><span className="text-gray-500 transition-colors text-sm font-medium">Concierge</span></li>
              <li><span className="text-gray-500 transition-colors text-sm font-medium">Fleet</span></li>
            </ul>
          </div>

          {/* Social Presence */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">
              Social Presence
            </h4>
            <div className="flex gap-4">
              <a
                href="https://wa.me/355692116666"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#8ecd24] hover:text-[#011111] transition-all group"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 32 32">
                  <path d="M16 .4C7.5.4.6 7.3.6 15.8c0 2.8.7 5.5 2.1 7.9L.4 31.6l8.1-2.1c2.3 1.3 4.9 2 7.5 2 8.5 0 15.4-6.9 15.4-15.4S24.5.4 16 .4zm0 28.2c-2.4 0-4.7-.6-6.7-1.9l-.5-.3-4.8 1.3 1.3-4.7-.3-.5c-1.3-2-2-4.3-2-6.7C3 8.4 8.4 3 16 3s13 5.4 13 13-5.4 12.6-13 12.6zm7.1-9.5c-.4-.2-2.4-1.2-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.6-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.3-.4.4-.7.1-.2 0-.5-.1-.7-.1-.2-.9-2.1-1.3-2.9-.3-.7-.7-.6-.9-.6h-.8c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 3 0 1.7 1.3 3.4 1.5 3.6.2.2 2.5 3.8 6.1 5.2.8.3 1.4.5 1.9.6.8.2 1.5.2 2 .1.6-.1 2.4-1 2.8-1.9.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/makina_me_qera_aura?igsh=c3psYWo2bDIwajVr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#8ecd24] hover:text-[#011111] transition-all group"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.75-1a.75.75 0 110 1.5.75.75 0 010-1.5z" />
                </svg>
              </a>

              <a
                href="https://facebook.com/aura_rental"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#8ecd24] hover:text-[#011111] transition-all group"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
                </svg>
              </a>
            </div>
            <p className="mt-6 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
              Follow for daily exclusive fleet drops
            </p>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">
            © 2024 Aura Rental. Prestige Mobility Group.
          </p>
          <div className="flex gap-8 text-[10px] text-gray-700 font-black uppercase tracking-widest">
  <Link to="/privacy" className="hover:text-white transition-colors cursor-pointer">
    Privacy
  </Link>
  <Link to="/terms" className="hover:text-white transition-colors cursor-pointer">
    Terms
  </Link>
  <Link to="/cookies" className="hover:text-white transition-colors cursor-pointer">
    Cookies
  </Link>
</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;