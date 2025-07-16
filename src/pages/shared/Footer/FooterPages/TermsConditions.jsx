import React, { useEffect } from "react";
import { Link } from "react-router";

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="bg-gray-100 p-10 mt-28 mb-16 rounded-2xl text-gray-800">
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

      {/* Terms Content */}
      <div className="max-w-7xl mx-auto p-6 mt-5 bg-white shadow-2xl  rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          Terms & Conditions
        </h1>

        <p className="mb-6 text-lg">
          Welcome to <strong>EduNest</strong>, a modern EdTech platform designed
          to support learners, tutors, and educational institutions. By using
          our website and services, you agree to comply with the following Terms
          & Conditions. Please read them carefully.
        </p>

        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold">1. User Eligibility</h2>
            <p>
              Users must be at least 13 years old to register and use EduNest.
              Those under 18 should have parental or guardian consent.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">2. Account Responsibility</h2>
            <p>
              Users are responsible for maintaining the confidentiality of their
              login credentials and any activity under their account.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">3. Content Guidelines</h2>
            <p>
              Users must not upload or distribute any harmful, offensive, or
              plagiarized content. All submitted materials should be original or
              properly credited.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">4. Learning Materials</h2>
            <p>
              Content provided by tutors and institutions must be accurate,
              respectful, and aligned with educational goals. EduNest is not
              liable for third-party material quality or correctness.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">5. User Conduct</h2>
            <p>
              All users are expected to maintain a respectful, inclusive, and
              honest learning environment. Any abusive, discriminatory, or
              inappropriate behavior may result in suspension or removal.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">6. Privacy Policy</h2>
            <p>
              We respect your privacy. User data is handled in accordance with
              our Privacy Policy. Do not share sensitive information publicly on
              the platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">7. Prohibited Uses</h2>
            <p>
              Users must not use EduNest for illegal activities, spamming,
              hacking, or sharing inappropriate educational content.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">8. Termination of Access</h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these terms, applicable laws, or misuse platform features.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">9. Changes to Terms</h2>
            <p>
              These Terms may be updated from time to time. Continued use of
              EduNest after changes means you accept the updated terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              10. Limitation of Liability
            </h2>
            <p>
              EduNest provides an educational platform but is not responsible
              for outcomes of learning activities or the actions of individual
              users.
            </p>
          </div>
        </div>

        <footer className="mt-10 text-center text-sm text-gray-500">
          &copy; 2025 <strong>EduNest</strong>. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default TermsConditions;
