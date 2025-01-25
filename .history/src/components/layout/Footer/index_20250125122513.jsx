import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-black text-white py-6">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <p className="text-zinc-300">
          &copy; {currentYear} SewaLapang. Semua hak cipta dilindungi.
        </p>
      </div>
    </div>
  );
};
