import React from 'react';

const SocialFloating: React.FC = () => {
  return (
    <div className="fixed right-6 bottom-6 z-[200] flex flex-col gap-3">

      {/* WhatsApp */}
      <a
        href="https://wa.me/+355692116666"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-[20px] flex items-center justify-center text-white shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group relative bg-[#25D366]"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 32 32">
          <path d="M16 .4C7.5.4.6 7.3.6 15.8c0 2.8.7 5.5 2.1 7.9L.4 31.6l8.1-2.1c2.3 1.3 4.9 2 7.5 2 8.5 0 15.4-6.9 15.4-15.4S24.5.4 16 .4zm0 28.2c-2.4 0-4.7-.6-6.7-1.9l-.5-.3-4.8 1.3 1.3-4.7-.3-.5c-1.3-2-2-4.3-2-6.7C3 8.4 8.4 3 16 3s13 5.4 13 13-5.4 12.6-13 12.6zm7.1-9.5c-.4-.2-2.4-1.2-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.6-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.3-.4.4-.7.1-.2 0-.5-.1-.7-.1-.2-.9-2.1-1.3-2.9-.3-.7-.7-.6-.9-.6h-.8c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 3 0 1.7 1.3 3.4 1.5 3.6.2.2 2.5 3.8 6.1 5.2.8.3 1.4.5 1.9.6.8.2 1.5.2 2 .1.6-.1 2.4-1 2.8-1.9.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5z" />
        </svg>
        <span className="absolute right-full mr-4 bg-[#011111] border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl">
          WhatsApp
        </span>
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/makina_me_qera_aura?igsh=c3psYWo2bDIwajVr"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-[20px] flex items-center justify-center text-white shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group relative bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.75-1a.75.75 0 110 1.5.75.75 0 010-1.5z" />
        </svg>
        <span className="absolute right-full mr-4 bg-[#011111] border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl">
          Instagram
        </span>
      </a>

      {/* Facebook */}
      <a
        href="https://facebook.com/aura_rental"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-[20px] flex items-center justify-center text-white shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group relative bg-[#1877F2]"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
        </svg>
        <span className="absolute right-full mr-4 bg-[#011111] border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl">
          Facebook
        </span>
      </a>

    </div>
  );
};

export default SocialFloating;
