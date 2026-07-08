import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Car } from "../types";

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { t } = useTranslation();

  const imageUrl = car.image?.startsWith("https")
    ? car.image
    : car.image
      ? `https://aurarental.pythonanywhere.com/${car.image}`
      : "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="group relative glass rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:border-[#8ecd24]/40 hover:-translate-y-2 bg-[#0b1c1c]/50">

      <div className="absolute inset-0 bg-gradient-to-b from-[#8ecd24]/0 to-[#8ecd24]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={imageUrl}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
        />

        <div className="absolute bottom-5 right-5">
          <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 flex items-baseline gap-1">
            <span className="text-[#8ecd24] font-black text-xl">€{car.price}</span>
            <span className="text-gray-400 text-[9px] font-black uppercase tracking-widest">
              {t("car.perDay")}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 relative z-10">

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">
            {car.name}
          </h3>

          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-gray-700"></span>
            {car.category || t("car.defaultCategory")}
          </p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 auto-rows-fr gap-3 mb-6">

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-gray-400 text-[10px] font-black uppercase">
              {car.transmission || t("car.auto")}
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-gray-400 text-[10px] font-black uppercase">
              {car.fuel_type || t("car.hybrid")}
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-gray-400 text-[10px] font-black uppercase">
              {car.seats || "5"} {t("car.seats")}
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-gray-400 text-[10px] font-black uppercase">
              {car.doors || "4"} {t("car.doors")}
            </span>
          </div>

          <div className="col-span-1 flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-gray-400 text-[10px] font-black uppercase">
              {car.air_conditioning ? t("car.acOn") : t("car.acOff")}
            </span>
          </div>

        </div>

        {/* Button */}
        <Link
          to={`/car-rental/${car.id}`}
          className="group/btn relative w-full flex items-center justify-center bg-white/[0.05] border border-white/10 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-[#8ecd24] hover:text-[#011111] hover:border-[#8ecd24]"
        >
          <span className="relative z-10 flex items-center gap-2">
            {t("car.bookNow")}
            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </Link>

      </div>
    </div>
  );
};

export default CarCard;