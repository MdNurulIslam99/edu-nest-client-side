import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
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
      <section className="my-16 px-4 max-w-7xl mx-auto text-center">
        <p>Loading partners...</p>
      </section>
    );
  }

  return (
    <section className="my-10 bg-gray-200 py-5 px-5 rounded-lg shadow-2xl max-w-7xl mx-auto">
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
        centerSlidePercentage={20} // show approx 4 logos on desktop
        swipeable
        emulateTouch
        showIndicators={false}
      >
        {partners.map(({ id, company, logoUrl }) => (
          <div
            key={id}
            className="flex justify-center rounded-full items-center p-5 px-2"
            aria-label={`Partner company logo: ${company}`}
          >
            <img
              src={logoUrl}
              alt={company}
              className="w-24 h-24 object-contain rounded-full bg-base-100 p-2
                transition-transform duration-300 ease-in-out cursor-pointer
                scale-90 hover:scale-110 hover:-translate-y-4 hover:z-20"
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default PartnersSection;
