import React from "react";
import {
  FaCode,
  FaPaintBrush,
  FaBusinessTime,
  FaLanguage,
} from "react-icons/fa";
import { useNavigate } from "react-router";

const categories = [
  {
    title: "Web Development",
    icon: <FaCode />,
    desc: "HTML, CSS, React, JavaScript & more",
  },
  {
    title: "Graphic Design",
    icon: <FaPaintBrush />,
    desc: "Photoshop, Illustrator, Canva, UI/UX",
  },
  {
    title: "Business & Marketing",
    icon: <FaBusinessTime />,
    desc: "Sales, Branding, Strategy, SEO",
  },
  {
    title: "Language Learning",
    icon: <FaLanguage />,
    desc: "English, Spanish, French & more",
  },
];

const StudentTestimonials = () => {
  const navigate = useNavigate(); //  Hook for navigation

  const handleCardClick = () => {
    navigate("/allClasses"); //  Navigate to All Classes page
  };

  return (
    <div className="py-16 w-11/12 mx-auto px-5 bg-gray-100 mt-20 mb-16 rounded-xl shadow-lg">
      <div className=" px-4 text-center">
        <h2 className="text-4xl font-bold text-indigo-600 mb-10">
          All Categories
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={handleCardClick} //  Card click handler
              className="cursor-pointer p-6 border rounded-xl shadow-md hover:shadow-lg transition text-center bg-indigo-50"
            >
              <div className="text-4xl text-indigo-700 mb-4 mx-auto">
                {cat.icon}
              </div>
              <h3 className="font-bold text-black text-lg mb-2">{cat.title}</h3>
              <p className="text-gray-600 text-sm">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentTestimonials;
