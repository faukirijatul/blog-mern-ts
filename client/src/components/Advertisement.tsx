import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Advertisement: React.FC = () => {
  const { randomOneBanner, randomTwoBanners } = useSelector(
    (state: RootState) => state.banner
  );

  return (
    <div className="flex-1">
      <div className="space-y-4 hidden lg:block mt-11">
        {randomTwoBanners.map((ad) => (
          <div key={ad._id} className="bg-white border border-gray-300 shadow">
            <a href={ad.link} target="_blank" rel="noopener noreferrer">
              <img
                src={ad.image.url}
                alt={ad.title}
                className="w-full h-auto"
              />
            </a>
          </div>
        ))}
      </div>

      <div className="lg:hidden">
        <div className="bg-white border border-gray-300 shadow">
          <a
            href={randomOneBanner?.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={randomOneBanner?.image.url}
              alt="Advertisement"
              className="w-full h-auto"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
