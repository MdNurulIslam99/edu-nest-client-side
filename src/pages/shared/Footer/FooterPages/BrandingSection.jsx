import React, { useEffect } from "react";
import { Link } from "react-router";
import { FaGraduationCap } from "react-icons/fa";
import { MdOutlineLightbulb } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";

const BrandingSection = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <section className="bg-indigo-50 mt-28 mb-16 py-16 rounded-lg  px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <FaGraduationCap className="text-indigo-600 text-5xl" />
        </div>
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">
          Welcome to <span className="text-indigo-900">EduNest</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          EduNest is your digital learning companion — empowering students,
          educators, and institutions to connect, grow, and achieve more.
          Whether you're learning a new skill, teaching a class, or managing an
          institute, EduNest provides the tools to make education accessible,
          organized, and inspiring.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-6">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full sm:w-72">
            <MdOutlineLightbulb className="text-3xl text-indigo-600 mb-2" />
            <h3 className="text-lg font-semibold">Innovative Learning</h3>
            <p className="text-sm text-gray-600 text-center">
              Experience modern, skill-based learning environments tailored to
              your growth.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full sm:w-72">
            <PiStudentBold className="text-3xl text-indigo-600 mb-2" />
            <h3 className="text-lg font-semibold">Student-Centered</h3>
            <p className="text-sm text-gray-600 text-center">
              Learn at your own pace, connect with mentors, and build your path
              to success.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full sm:w-72">
            <FaGraduationCap className="text-3xl text-indigo-600 mb-2" />
            <h3 className="text-lg font-semibold">For Institutions</h3>
            <p className="text-sm text-gray-600 text-center">
              Streamline your class, student, and course management with our
              MERN-powered tools.
            </p>
          </div>
        </div>

        <Link
          to="/"
          className="inline-block mt-10 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default BrandingSection;
