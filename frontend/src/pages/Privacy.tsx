import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#011111] text-gray-300 pt-40 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-white text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-sm leading-relaxed mb-6">
          Your privacy is important to us. At Aura Rental, we collect only the information necessary
          to provide a seamless car reservation experience and deliver personalized service.
          This includes details such as your name, contact information, reservation preferences,
          and payment data when making a booking.
        </p>

        <p className="text-sm leading-relaxed mb-6">
          All data is securely stored and processed in accordance with modern security standards.
          We do not sell or share your personal information with third parties for marketing purposes.
          Information may be shared only with trusted service providers necessary to complete
          reservations, payment processing, or legal compliance.
        </p>

        <p className="text-sm leading-relaxed">
          By using our website, you consent to the collection and use of information as described.
          You have the right to request access to your data, corrections, or deletion in accordance
          with applicable privacy regulations.
        </p>
      </div>
    </div>
  );
};

export default Privacy;