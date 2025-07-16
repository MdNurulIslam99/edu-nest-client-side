import React, { useEffect } from "react";
import { Link } from "react-router";

const Design = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="bg-gray-50 mt-28 mb-16 rounded-2xl text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-indigo-500 rounded-2xl text-white p-4 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">EduNest</h1>
          <nav>
            <Link to="/" className="hover:underline text-xl font-semibold">
              Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <main className="max-w-6xl  mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-indigo-700 mb-4 text-center">
          Our Design Philosophy
        </h2>
        <p className="text-lg mb-8 text-center text-gray-600 max-w-3xl mx-auto">
          EduNest combines intuitive design with powerful technology to provide
          a seamless educational experience. Our platform is built to be clean,
          responsive, and engaging—ensuring every user, from student to admin,
          enjoys an accessible, modern learning interface.
        </p>

        {/* Design Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-indigo-300 transition">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">
              🎯 User-Centered
            </h3>
            <p>
              Interfaces are designed for clarity and ease. We prioritize real
              user feedback, simplicity in navigation, and minimizing cognitive
              overload.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-indigo-300 transition">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">
              🧩 Modular & Scalable
            </h3>
            <p>
              Components are reusable, responsive, and built with scalability in
              mind using modern React and TailwindCSS frameworks.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-indigo-300 transition">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">
              📱 Mobile-First
            </h3>
            <p>
              Every feature works seamlessly across devices. EduNest is designed
              with a mobile-first approach to ensure accessibility anywhere.
            </p>
          </div>
        </div>

        {/* Design Stack */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold text-indigo-700 mb-4">
            Design Tools & Stack
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <strong>Frontend:</strong> React.js, Tailwind CSS, DaisyUI
            </li>
            <li>
              <strong>Design System:</strong> Component-based UI with
              accessibility support (ARIA, contrast)
            </li>
            <li>
              <strong>Prototyping:</strong> Figma for wireframes and design flow
            </li>
            <li>
              <strong>Icons & Illustrations:</strong> Lucide, Heroicons, custom
              SVG sets
            </li>
          </ul>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg font-medium mb-4">
            Want to explore our visual system or contribute ideas?
          </p>
          <Link
            to="/contact"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Contact the Design Team
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-sm text-center py-4 text-gray-600">
        &copy; 2025 EduNest. All rights reserved.
      </footer>
    </div>
  );
};

export default Design;
