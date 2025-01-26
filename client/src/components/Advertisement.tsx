import React from "react";


const Advertisement: React.FC = () => {
  const ads = [
    "https://info.populix.co/articles/wp-content/uploads/2022/11/2.-contoh-iklan-minuman.webp",
    "https://dropshipaja.com/blog/wp-content/uploads/2023/11/Contoh-Iklan-TicTac.jpg",
  ];

  const randomAd = ads[Math.floor(Math.random() * ads.length)];

  return (
    <div
      className="flex-1"
    >
      <div className="space-y-4 hidden lg:block mt-11">
        {ads.map((ad, index) => (
          <div key={index} className="bg-white border border-gray-300 shadow">
            <img
              src={ad}
              alt={`Advertisement ${index + 1}`}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>

      <div className="lg:hidden">
        <div className="bg-white border border-gray-300 shadow">
          <img src={randomAd} alt="Advertisement" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
