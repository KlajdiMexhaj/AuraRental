import React from 'react';
import { useTranslation } from "react-i18next";

const Terms: React.FC = () => {

  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#011111] text-gray-300 pt-40 pb-20">
      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-white text-3xl font-bold mb-6">
          {t("terms.title")}
        </h1>

        <p className="text-sm leading-relaxed mb-6">
          {t("terms.paragraph1")}
        </p>

        <p className="text-sm leading-relaxed mb-6">
          {t("terms.paragraph2")}
        </p>

        <p className="text-sm leading-relaxed mb-6">
          {t("terms.paragraph3")}
        </p>

        <p className="text-sm leading-relaxed">
          {t("terms.paragraph4")}
        </p>

      </div>
    </div>
  );
};

export default Terms;