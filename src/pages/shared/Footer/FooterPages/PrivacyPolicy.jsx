import React, { useEffect } from "react";
import { Link } from "react-router";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="bg-gray-50 mt-28 p-5 mb-16 rounded-2xl text-gray-800 font-sans">
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

      {/* Main Privacy Policy Content */}
      <main className="max-w-7xl  mx-auto p-6 mt-6 bg-white shadow-2xl rounded-xl">
        <h2 className="text-4xl text-center font-bold mb-4 text-indigo-700">
          Privacy Policy
        </h2>

        <p className="mb-4">
          At <strong>EduNest</strong>, your privacy matters to us. This Privacy
          Policy outlines how we collect, use, store, and protect your personal
          data when you use our educational services. Whether you're a student,
          tutor, or institution, we are committed to safeguarding your
          information and ensuring a transparent and secure learning
          environment.
        </p>

        <section className="mb-6">
          <h3 className="text-lg font-bold text-indigo-600">
            Information Collection:
          </h3>
          <p>
            We collect information such as your name, email address, institution
            details, subjects of interest, and other profile-related data when
            you sign up or use our platform.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-bold text-indigo-600">Use of Data:</h3>
          <p>
            Collected data helps us personalize your learning experience, match
            students with tutors or institutions, deliver course content, and
            improve our services.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-bold text-indigo-600">Data Sharing:</h3>
          <p>
            Your information is never sold. We only share data with trusted
            third-party services that help operate EduNest or when legally
            required.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-bold text-indigo-600">
            Security Measures:
          </h3>
          <p>
            We use modern encryption, secure servers, and other technologies to
            protect your data from unauthorized access or misuse.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-bold text-indigo-600">User Control:</h3>
          <p>
            You can edit, update, or delete your account and data at any time.
            You can also opt out of optional communications like promotional
            emails.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-bold text-indigo-600">
            Cookies & Tracking:
          </h3>
          <p>
            We use cookies to enhance platform functionality and improve user
            experience. You have full control over cookie preferences.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-bold text-indigo-600">
            Children’s Privacy:
          </h3>
          <p>
            EduNest is designed for users 13 and older. We do not knowingly
            collect data from users under the age of 13 without parental
            consent.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-bold text-indigo-600">Policy Updates:</h3>
          <p>
            We may update this policy occasionally. You will be notified of any
            major changes through email or notifications on the platform.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-10 p-4 text-center text-sm text-gray-600">
        &copy; 2025 EduNest. All rights reserved.
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
