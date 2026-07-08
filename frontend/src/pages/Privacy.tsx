import React from 'react';
import { useTranslation } from "react-i18next";

const Privacy: React.FC = () => {

  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#011111] text-gray-300 pt-40 pb-20">
      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-white text-3xl font-bold mb-6">
          {t("privacy.title")}
        </h1>

        <p className="text-sm leading-relaxed mb-6">
          {t("privacy.paragraph1")}
        </p>

        <p className="text-sm leading-relaxed mb-6">
          {t("privacy.paragraph2")}
        </p>

        <p className="text-sm leading-relaxed">
          {t("privacy.paragraph3")}
        </p>

      </div>
    </div>
  );
};

export default Privacy;