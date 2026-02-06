
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
const isActive = (path: string) => {
  const [pathname, hash] = path.split('#');

  // Discover → ONLY when on "/" AND no hash
  if (pathname === '/' && !hash) {
    return location.pathname === '/' && location.hash === '';
  }

  // Hash sections (/ #about, / #contact)
  if (hash) {
    return (
      location.pathname === pathname &&
      location.hash === `#${hash}`
    );
  }

  // Normal routes (/cars)
  return location.pathname === pathname;
};

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Discover', path: '/' },
    { name: 'Our Fleet', path: '/cars' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className={`max-w-7xl mx-auto px-6 transition-all duration-500`}>
        <div className={`flex justify-between items-center rounded-3xl transition-all duration-500 px-8 ${scrolled ? 'bg-[#0b1c1c]/80 backdrop-blur-2xl border border-white/5 shadow-2xl py-3' : 'bg-transparent py-0'}`}>
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-[#8ecd24] rounded-xl flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-700 shadow-[0_0_15px_rgba(142,205,36,0.3)]">
              <span className="text-[#011111] font-black text-xl">A</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white flex flex-col leading-none">
              AURA <span className="text-[#8ecd24] text-[10px] tracking-[0.4em] font-black uppercase">Rental</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
{navLinks.map(link => (
  <Link
    key={link.name}
    to={link.path}
    className={`text-[11px] font-black uppercase tracking-widest transition-all relative group/link
      ${
        isActive(link.path)
          ? 'text-[#8ecd24]'
          : 'text-white/70 hover:text-[#8ecd24]'
      }`}
  >
    {link.name}
    <span
      className={`absolute -bottom-1 left-0 h-[2px] bg-[#8ecd24] transition-all duration-300
        ${
          isActive(link.path)
            ? 'w-full'
            : 'w-0 group-hover/link:w-full'
        }`}
    />
  </Link>
))}
            <Link 
              to="/cars"
              className="bg-white text-[#011111] px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#8ecd24] hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              Reserve
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white/70 hover:text-white transition-colors"
            >
              <div className="w-6 flex flex-col gap-1.5 items-end">
                <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-[#011111] z-[90] transition-all duration-500 ease-expo ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-12 px-6">
          {navLinks.map(link => (
          <Link
            key={link.name}
            to={link.path}
            className="text-4xl font-black tracking-tighter hover:text-[#8ecd24] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </Link>
        ))}

          <Link 
            to="/cars"
            className="w-full bg-[#8ecd24] text-[#011111] py-6 rounded-3xl font-black text-center text-xl shadow-[0_20px_40px_rgba(142,205,36,0.2)]"
            onClick={() => setIsOpen(false)}
          >
            Start Booking
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
