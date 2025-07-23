import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // ✅ Removed Navigation
import { FaUserGraduate, FaEnvelope, FaUsers } from "react-icons/fa";
import "swiper/css";
// import "swiper/css/navigation"; // ✅ Removed
import "swiper/css/pagination";

const PopularClasses = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: popularClasses = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popularClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/popular-classes");
      return res.data
        .sort((a, b) => (b.enrolled || 0) - (a.enrolled || 0))
        .slice(0, 6);
    },
  });

  if (isLoading)
    return <p className="text-center">Loading popular classes...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">Failed to load popular classes</p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div>
        <h2 className="text-3xl font-bold text-center mb-4 text-indigo-700">
          Most Popular Classes
        </h2>

        <p className="text-center max-w-6xl mx-auto text-gray-600 mb-10">
          Discover our most sought-after classes, handpicked based on student
          enrollment. These top-rated courses are engaging, in demand, and led
          by our best instructors. Join now and elevate your learning journey!
        </p>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]} // ✅ Removed Navigation module
        className="mySwiper"
      >
        {popularClasses.map((cls) => (
          <SwiperSlide key={cls._id} className="h-full">
            <div className="w-full h-[480px] flex flex-col bg-white shadow-lg rounded-xl overflow-hidden border border-indigo-100 transition-transform duration-300 hover:scale-105">
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-56 object-cover"
              />
              <div className="flex flex-col justify-between flex-grow p-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-indigo-700">
                    {cls.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {cls.description?.slice(0, 80)}...
                  </p>
                  <div className="text-sm text-gray-500 space-y-1 mt-2">
                    <p className="flex items-center gap-2">
                      <FaUserGraduate className="text-indigo-500" />
                      {cls.instructorName}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaEnvelope className="text-indigo-500" />
                      {cls.instructorEmail}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-indigo-600">
                  <FaUsers /> Enrolled: {cls.totalEnrollment || 0}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularClasses;
