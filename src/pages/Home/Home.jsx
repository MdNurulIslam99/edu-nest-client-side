import React from "react";
import SwiperSlider from "../SwiperSlider/SwiperSlider";
import PartnersSection from "../PartnersSection/PartnersSection";

const Home = () => {
  return (
    <div>
      <div className="mt-14 mb-10">
        <SwiperSlider></SwiperSlider>
      </div>
      <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 xl:px-24 2xl:px-28 py-1">
        <div className="mt-5 mb-10">
          <PartnersSection></PartnersSection>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
