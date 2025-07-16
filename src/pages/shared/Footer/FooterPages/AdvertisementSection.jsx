import React from "react";
import { Link } from "react-router";

const AdvertisementSection = () => {
  return (
    <section className="bg-indigo-50 mt-28 mb-16 rounded-2xl py-12 px-6 md:px-20 text-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-700 leading-tight">
            Unlock Your Learning Potential with{" "}
            <span className="text-indigo-900">EduNest</span>
          </h2>
          <p className="text-lg mb-6">
            Whether you're a student looking to improve your skills, a tutor
            ready to teach, or an institution aiming to expand online — EduNest
            is your all-in-one solution. Join our platform and start your smart
            learning journey today!
          </p>
          <div className="flex gap-4">
            <Link
              to="/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Get Started
            </Link>
            <Link
              to="/"
              className="border border-indigo-600 text-indigo-700 font-semibold py-3 px-6 rounded-lg hover:bg-indigo-100 transition"
            >
              Browse Courses
            </Link>
          </div>
        </div>

        {/* Image or Graphic */}
        <div className="w-full  lg:w-1/2 flex justify-center">
          <img
            src="https://i.ibb.co/b5ZZcGjq/advatise.jpg"
            alt="EduNest learning"
            className="w-full max-w-md rounded-xl drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default AdvertisementSection;
