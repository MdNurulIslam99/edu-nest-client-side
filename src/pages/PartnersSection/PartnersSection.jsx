import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import Marquee from "react-fast-marquee";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const PartnersSection = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetch("/company.json")
      .then((res) => res.json())
      .then((data) => setPartners(data))
      .catch((error) => {
        console.error("Failed to load partners data:", error);
      });
  }, []);

  if (!partners.length) {
    return (
      <div className="my-16 px-4 max-w-7xl mx-auto text-center">
        <p>Loading partners...</p>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto px-5">
      {/* ----------- Section 1: Trusted Partners ----------- */}
      {/* <div className="bg-gray-200 py-10 px-5 rounded-lg shadow-2xl mb-16">
        <h2 className="text-3xl font-bold text-center mb-6">
          Our Trusted Partners
        </h2>
        <p className="text-center mb-12 max-w-3xl mx-auto text-gray-600">
          EduNest collaborates with industry leaders and educational pioneers to
          deliver world-class learning experiences.
        </p>

        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={2500}
          stopOnHover={true}
          centerMode
          centerSlidePercentage={20}
          swipeable
          emulateTouch
          showIndicators={false}
        >
          {partners.map(({ id, company, logoUrl }) => (
            <div
              key={id}
              className="flex justify-center items-center px-2 "
              aria-label={`Partner logo: ${company}`}
            >
              <img
                src={logoUrl}
                alt={company}
                className="w-24 h-24 object-contain rounded-full bg-base-100 p-5
                transition-transform duration-300 ease-in-out cursor-pointer
                scale-90 hover:scale-110 hover:-translate-y-4 hover:z-20"
              />
            </div>
          ))}
        </Carousel>
      </div> */}

      {/* ----------- Section 2: Clients Using Our Services ----------- */}
      <div className="bg-gray-200 mb-16 py-10 px-5 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          Our Trusted Partners
        </h2>
        <p className="text-center xl:text-xl mb-12 max-w-3xl xl:max-w-4xl mx-auto text-gray-600">
          EduNest collaborates with industry leaders and educational pioneers to
          deliver world-class learning experiences.
        </p>

        <Marquee gradient={false} speed={40} direction="left" pauseOnHover>
          {partners.map(({ id, company, logoUrl }) => (
            <div
              key={id}
              className="mx-6 bg-blue-50 rounded-2xl  my-6 flex justify-center items-center px-2 "
              aria-label={`Client logo: ${company}`}
            >
              <img
                src={logoUrl}
                alt={company}
                // className="w-24 h-24 object-contain rounded-full
                // transition-transform duration-300 ease-in-out cursor-pointer
                // scale-90 hover:scale-110 hover:-translate-y-3 hover:z-20"

                className="w-24 h-24 object-contain rounded-full bg-base-100 p-2 
                transition-transform duration-300 ease-in-out cursor-pointer
                scale-90 hover:scale-110 hover:-translate-y-4 hover:z-20"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default PartnersSection;
