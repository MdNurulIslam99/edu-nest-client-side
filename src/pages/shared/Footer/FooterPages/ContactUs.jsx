import React, { useEffect } from "react";
import { FaPhone } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa6";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { MdAttachEmail } from "react-icons/md";
import { Link } from "react-router";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="bg-gray-100 rounded-2xl mt-28 mb-16 text-gray-800">
      {/* Header */}
      <header className="bg-indigo-500 rounded-lg text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">EduNest</h1>
          <nav>
            <Link to="/" className="hover:underline text-xl font-semibold">
              Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Intro Section */}
        <div className="bg-white rounded-lg p-6 shadow-2xl mb-10">
          <h1 className="text-3xl font-bold text-indigo-700 mb-4">
            Contact Us
          </h1>
          <p className="mb-6 text-lg">
            Have questions, feedback, or need assistance with EduNest? Our team
            is here to help! Whether you're an institution, tutor, or student,
            feel free to reach out. We’re committed to making learning more
            accessible and efficient for everyone.
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg p-6 shadow-2xl mb-10 space-y-3">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">
            Our Contact Information
          </h2>
          <p className="flex gap-3">
            <FaAddressCard size={25} />
            <strong>Address:</strong> 456 Learning Ave, EduCity, 12345
          </p>
          <p className="flex gap-3">
            <MdAttachEmail size={20} />
            <strong>Email:</strong>
            <a
              href="mailto:support@edunest.com"
              className="text-indigo-600 underline ml-1"
            >
              support@edunest.com
            </a>
          </p>
          <p className="flex gap-3">
            <IoChatboxEllipsesSharp size={20} />
            <strong>Live Chat:</strong> 9 AM – 6 PM (Mon–Fri)
          </p>
          <p className="flex gap-3">
            <FaPhone size={20} />
            <strong>Phone:</strong> +1 (800) 123-4567
          </p>
        </div>

        {/* Contact Form */}
        <form className="bg-white p-6 rounded-lg shadow-2xl space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">
            Send Us a Message
          </h2>
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              rows="5"
              placeholder="Type your message here..."
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
