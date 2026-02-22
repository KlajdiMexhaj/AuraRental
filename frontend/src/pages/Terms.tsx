import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#011111] text-gray-300 pt-40 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-white text-3xl font-bold mb-6">Terms & Conditions</h1>

        <p className="text-sm leading-relaxed mb-6">
          Welcome to Aura Rental. By accessing or using this website, you agree to comply with
          these terms and all applicable laws. Our platform provides car reservation services
          on a rental basis, subject to availability and verification of eligibility.
        </p>

        <p className="text-sm leading-relaxed mb-6">
          Reservations are confirmed only after successful payment and acceptance of booking
          conditions. Cancellations and modifications may be subject to fees according to
          our rental policies. Users are responsible for providing accurate information
          during the booking process.
        </p>

        <p className="text-sm leading-relaxed mb-6">
          Aura Rental reserves the right to modify services, pricing, and terms at any time.
          Continued use of the platform after changes constitutes acceptance of the updated
          conditions.
        </p>

        <p className="text-sm leading-relaxed">
          We strive to provide a premium mobility experience, but services are offered
          without warranties beyond those required by law. Users agree to use the platform
          responsibly and in accordance with all applicable regulations.
        </p>
      </div>
    </div>
  );
};

export default Terms;