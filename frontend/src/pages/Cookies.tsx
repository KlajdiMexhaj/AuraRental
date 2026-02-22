import React from 'react';

const Cookies: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#011111] text-gray-300 pt-40 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-white text-3xl font-bold mb-6">Cookies Policy</h1>

        <p className="text-sm leading-relaxed mb-6">
          Aura Rental uses cookies and similar technologies to enhance your browsing experience,
          remember preferences, and analyze site performance. Cookies help us understand how
          users interact with the platform so we can continually improve our services.
        </p>

        <p className="text-sm leading-relaxed mb-6">
          Some cookies are essential for website functionality, such as maintaining login
          sessions and processing reservations. Others are used for analytics and optimization.
          You can control or disable cookies through your browser settings, though this may
          affect certain features.
        </p>

        <p className="text-sm leading-relaxed">
          We value transparency and user choice. No personally identifiable information is
          stored in cookies without your consent, and data collected for analytics is used
          solely to improve the platform.
        </p>
      </div>
    </div>
  );
};

export default Cookies;