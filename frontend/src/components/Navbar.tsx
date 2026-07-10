import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const supportedLangs = ["en", "sq", "it", "de", "pl"];
  
  // Mapping for full names
  const langMap: Record<string, string> = {
    en: "English",
    sq: "Albanian",
    it: "Italian",
    de: "German",
    pl: "Polish"
  };

  const currentLang = location.pathname.split("/")[1] || "en";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLangChange = (newLang: string) => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (supportedLangs.includes(pathSegments[0])) {
      pathSegments[0] = newLang;
    } else {
      pathSegments.unshift(newLang);
    }
    navigate(`/${pathSegments.join("/")}`);
    setIsOpen(false);
    setIsLangOpen(false);
  };

  const lp = (path: string) => `/${currentLang}${path === "/" ? "" : path}`;

  const isActive = (path: string) => {
    const fullPath = lp(path);
    return location.pathname === fullPath;
  };

  const navLinks = [
    { name: t("nav.discover"), path: "/" },
    { name: t("nav.fleet"), path: "/cars-rental" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? "py-4" : "py-8"}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex justify-between items-center rounded-3xl transition-all duration-500 px-8 ${
            scrolled ? "bg-[#0b1c1c]/90 backdrop-blur-2xl border border-white/5 shadow-2xl py-3" : "bg-transparent py-0"
        }`}>
          {/* Logo */}
          <Link to={lp("/")} className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-[#8ecd24] rounded-xl flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-700">
              <span className="text-[#011111] font-black text-xl">A</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white flex flex-col leading-none">
              AURA <span className="text-[#8ecd24] text-[10px] tracking-[0.4em] font-black uppercase">{t("nav.brand")}</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={lp(link.path)}
                className={`text-[11px] font-black uppercase tracking-widest transition-all relative group/link
                  ${isActive(link.path) ? "text-[#8ecd24]" : "text-white/70 hover:text-[#8ecd24]"}`}
              >
                {link.name}
              </Link>
            ))}

            {/* Premium Language Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-3 bg-white/5 border border-white/10 pl-4 pr-3 py-2.5 rounded-2xl hover:bg-white/10 transition-all active:scale-95"
              >
                <div className="flex flex-col items-start leading-none">
                    <span className="text-[9px] text-[#8ecd24] font-black uppercase tracking-tighter opacity-80">Language</span>
                    <span className="text-[11px] font-black text-white uppercase tracking-wider">
                        {langMap[currentLang]}
                    </span>
                </div>
                <svg 
                  className={`w-3 h-3 text-[#8ecd24] transition-transform duration-500 ${isLangOpen ? "rotate-180" : ""}`} 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className={`absolute right-0 mt-4 w-48 bg-[#0b1c1c]/95 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 origin-top-right
                ${isLangOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"}`}
              >
                <div className="p-2 flex flex-col gap-1">
                  {supportedLangs.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLangChange(lang)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all
                        ${currentLang === lang 
                            ? "bg-[#8ecd24] text-[#011111]" 
                            : "text-white/60 hover:text-white hover:bg-white/5"}`}
                    >
                      <span>{langMap[lang]}</span>
                      
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Link to={lp("/cars-rental")} className="bg-white text-[#011111] px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#8ecd24] transition-all shadow-lg active:scale-95">
              {t("nav.reserve")}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
               <div className="w-6 flex flex-col gap-1.5 items-end">
                <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
                <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? "opacity-0" : "w-4"}`} />
                <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-5"}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-[#011111] z-[90] transition-all duration-700 ease-in-out ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
          <div className="flex flex-col items-center space-y-6">
            {navLinks.map((link) => (
                <Link key={link.path} to={lp(link.path)} onClick={() => setIsOpen(false)} className="text-3xl font-black uppercase tracking-tighter text-white hover:text-[#8ecd24]">
                {link.name}
                </Link>
            ))}
          </div>
          
          {/* Mobile Lang Selection */}
          <div className="w-full max-w-xs pt-10 border-t border-white/10">
            <p className="text-center text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-6">Select Language</p>
            <div className="flex flex-wrap justify-center gap-3">
                {supportedLangs.map((lang) => (
                <button 
                    key={lang} 
                    onClick={() => handleLangChange(lang)} 
                    className={`text-[10px] font-black uppercase px-4 py-2 rounded-full border transition-all ${currentLang === lang ? "bg-[#8ecd24] text-[#011111] border-[#8ecd24]" : "text-white/50 border-white/10"}`}
                >
                    {langMap[lang]}
                </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;