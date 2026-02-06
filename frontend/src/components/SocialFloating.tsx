
import React from 'react';

const SocialFloating: React.FC = () => {
  const socials = [
    { name: 'WhatsApp', icon: 'M12 2C6.48 2 2 6.48 2 12c0 1.94.57 3.75 1.55 5.27L2.1 21.9l4.75-1.45C8.25 21.43 10.06 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.74 0-3.37-.53-4.73-1.44l-.34-.23-2.82.86.87-2.75-.25-.37C3.53 14.88 3 13.49 3 12c0-4.96 4.04-9 9-9s9 4.04 9 9-4.04 9-9 9z', link: 'https://wa.me/+355698513954', color: 'bg-[#25D366]' },
    { name: 'Instagram', icon: 'M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.75-1a.75.75 0 110 1.5.75.75 0 010-1.5z', link: 'https://www.instagram.com/makina_me_qera_aura?igsh=c3psYWo2bDIwajVr', color: 'bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600' },
    { name: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z', link: 'https://facebook.com/aura_rental', color: 'bg-[#1877F2]' }
  ];

  return (
    <div className="fixed right-6 bottom-6 z-[200] flex flex-col gap-3">
      {socials.map((social) => (
        <a 
          key={social.name}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-14 h-14 rounded-[20px] flex items-center justify-center text-white shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group relative ${social.color}`}
        >
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d={social.icon}></path></svg>
          <span className="absolute right-full mr-4 bg-[#011111] border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl">
            {social.name}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialFloating;
