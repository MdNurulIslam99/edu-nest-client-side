import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";

const FeedbackCarousel = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: feedbacks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feedback");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading feedback...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">
        Failed to load feedbacks. Try again later.
      </p>
    );

  return (
    <div className="w-11/12 mx-auto py-10 px-5">
      {/* Section Header */}
      <div>
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-3">
          What Students Say About Our Teachers
        </h2>
        <p className="text-center xl:text-lg text-gray-600 mb-10 max-w-3xl xl:max-w-5xl mx-auto">
          Discover how our dedicated instructors are impacting student journeys
          through engaging lessons and mentorship. Here's what learners have to
          say.
        </p>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {feedbacks.map((fb) => (
          <SwiperSlide key={fb._id}>
            <div className="h-[300px] w-full bg-gray-200 rounded-xl shadow-xl p-5 flex flex-col justify-between border border-indigo-100 hover:shadow-xl transition duration-300">
              <div>
                <FaQuoteLeft className="text-indigo-500 text-3xl mb-3" />
                <p className="text-gray-700 text-sm xl:text-base italic line-clamp-5">
                  {fb.description}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 mt-6 border-t border-gray-200">
                <img
                  src={fb.studentImage}
                  alt="student"
                  className="w-12 h-12 rounded-full border"
                />
                <div>
                  <p className="font-medium text-indigo-700 text-sm xl:text-base">
                    {fb.studentEmail}
                  </p>
                  <p className="text-gray-500 text-xs xl:text-sm">
                    {fb.classTitle}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeedbackCarousel;
