import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router";

const SwiperSlider = () => {
  return (
    <div className="relative w-11/12 mx-auto px-5 py-10 h-[60vh] md:h-[70vh]">
      <div className="swiper-Link-prev-custom absolute top-1/2 left-5 md:left-6 z-10 transform -translate-y-1/2 text-white bg-black/50 p-2 md:p-3 rounded-full cursor-pointer">
        <FaChevronLeft className="text-lg md:text-xl" />
      </div>
      <div className="swiper-Link-next-custom absolute top-1/2 right-5 md:right-6 z-10 transform -translate-y-1/2 text-white bg-black/50 p-2 md:p-3 rounded-full cursor-pointer">
        <FaChevronRight className="text-lg md:text-xl" />
      </div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".swiper-Link-next-custom",
          prevEl: ".swiper-Link-prev-custom",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="w-full h-full"
      >
        {/* 7 Unique Slides for EduNest */}

        {/* Slide 1 */}
        <SwiperSlide>
          <SlideContent
            bg="https://i.ibb.co/PGKcG37j/banner1.jpg"
            title="Unlock Limitless Learning"
            description="Empower your future with expert-led courses tailored to your goals."
            button="Browse Courses"
          />
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <SlideContent
            bg="https://i.ibb.co/LdStzjXs/banner2.jpg"
            title="Smarter Classroom Management"
            description="Streamline attendance, grading, and communication — all in one place."
            button="Start Teaching"
          />
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <SlideContent
            bg="https://i.ibb.co/DHC1k0TR/banner3.jpg"
            title="Your Learning, Your Way"
            description="Flexible schedules, live sessions, and recordings — learn anytime, anywhere."
            button="Explore Flexibility"
          />
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide>
          <SlideContent
            bg="https://i.ibb.co/m57KkCsh/banner4.jpg"
            title="Interactive Tutor Dashboard"
            description="Manage classes, assignments, and analytics with ease."
            button="Access Dashboard"
          />
        </SwiperSlide>

        {/* Slide 5 */}
        <SwiperSlide>
          <SlideContent
            bg="https://i.ibb.co/N2cLgZNn/banner8.jpg"
            title="Build Real Skills That Matter"
            description="Join project-based courses designed by top educators and industry experts."
            button="Join Now"
          />
        </SwiperSlide>

        {/* Slide 6 */}
        <SwiperSlide>
          <SlideContent
            bg="https://i.ibb.co/v62GcLJ6/banner7.jpg"
            title="Learn With Global Peers"
            description="Collaborate, communicate, and grow with a thriving student community."
            button="Meet Learners"
          />
        </SwiperSlide>

        {/* Slide 7 */}
        <SwiperSlide>
          <SlideContent
            bg="https://i.ibb.co/4Zxy5mHM/banner9.jpg"
            title="From Enrollment to Achievement"
            description="EduNest supports you every step — from sign-up to certification."
            button="Get Started"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

//  Reusable SlideContent component
const SlideContent = ({ bg, title, description, button }) => (
  <div
    className="w-full h-full bg-cover bg-center rounded-lg text-white"
    style={{ backgroundImage: `url(${bg})` }}
  >
    <div className="flex h-full items-center justify-start p-8 md:p-16">
      <div className="bg-black bg-opacity-50 p-5 md:p-10 rounded-lg max-w-xl">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">{title}</h1>
        <p className="mt-4 text-sm md:text-base lg:text-lg">{description}</p>
        <Link
          to="/allClasses"
          className="btn mt-6 bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200 transition"
        >
          {button}
        </Link>
      </div>
    </div>
  </div>
);

export default SwiperSlider;
