import React from "react";
import SwiperSlider from "../SwiperSlider/SwiperSlider";
import PartnersSection from "../PartnersSection/PartnersSection";
import PopularClasses from "../PopularClasses/PopularClasses";
import FeedbackCarousel from "../FeedbackCarousel/FeedbackCarousel";
import SiteStats from "../SiteStats/SiteStats";
import BecomeTeacher from "../BecomeTeacher/BecomeTeacher";
import StudentTestimonials from "../StudentTestimonials/StudentTestimonials";
import HowEduNestWorks from "../HowEduNestWorks/HowEduNestWorks";
import MeetInstructors from "../MeetInstructors/MeetInstructors";
import SupportSessions from "../SupportSessions/SupportSessions";
// import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      {/* <Helmet>EduNest | Home</Helmet> */}
      <div className="mt-14 mb-10">
        <SwiperSlider></SwiperSlider>
      </div>
      <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 xl:px-24 2xl:px-28 py-1">
        <div className="mt-5 mb-10">
          <PartnersSection></PartnersSection>
        </div>
        <div className="mt-5 mb-10">
          <PopularClasses></PopularClasses>
        </div>
        <div className="mt-5 mb-10">
          <FeedbackCarousel></FeedbackCarousel>
        </div>
        <div className="mt-5 mb-10">
          <SiteStats></SiteStats>
        </div>
        <div className="mt-5 mb-10">
          <BecomeTeacher></BecomeTeacher>
        </div>
        <div className="mt-5 mb-10">
          <StudentTestimonials></StudentTestimonials>
        </div>
        <div className="mt-5 mb-10">
          <HowEduNestWorks></HowEduNestWorks>
        </div>
        <div className="mt-5 mb-10">
          <SupportSessions></SupportSessions>
        </div>
        <div className="mt-5 mb-10">
          <MeetInstructors></MeetInstructors>
        </div>
      </div>
    </div>
  );
};

export default Home;
