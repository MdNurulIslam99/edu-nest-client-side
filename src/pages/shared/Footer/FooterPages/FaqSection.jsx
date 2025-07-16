import React from "react";
import { Link } from "react-router";

const FaqSection = () => {
  return (
    <div className="bg-gray-200 mt-28 mb-16 rounded-2xl">
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

      {/* FAQ Section */}
      <div className="py-8 max-w-screen-xl  mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
          Frequently Asked Questions (FAQ)
        </h1>

        {/* Question 1 */}
        <div className="collapse collapse-plus bg-base-100 border border-base-300 mb-4">
          <input type="radio" name="faq-accordion" defaultChecked />
          <div className="collapse-title font-bold text-lg">
            How do I sign up for EduNest?
          </div>
          <div className="collapse-content text-base font-medium">
            <span className="text-lg font-bold">Answer: </span>
            Click the "Sign Up" button on the homepage and fill out the
            registration form using your email, institution, or social login
            credentials.
          </div>
        </div>

        {/* Question 2 */}
        <div className="collapse collapse-plus bg-base-100 border border-base-300 mb-4">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-bold text-lg">
            How can I enroll in a course or class?
          </div>
          <div className="collapse-content text-base font-medium">
            <span className="text-lg font-bold">Answer: </span>
            After logging in, browse the Courses or Class sections. Select your
            preferred course, then click “Enroll” and follow the instructions.
          </div>
        </div>

        {/* Question 3 */}
        <div className="collapse collapse-plus bg-base-100 border border-base-300 mb-4">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-bold text-lg">
            How can I reset my password?
          </div>
          <div className="collapse-content text-base font-medium">
            <span className="text-lg font-bold">Answer: </span>
            Go to the login page, click “Forgot Password,” and follow the steps
            sent to your email to reset your password securely.
          </div>
        </div>

        {/* Question 4 */}
        <div className="collapse collapse-plus bg-base-100 border border-base-300 mb-4">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-bold text-lg">
            Can I message or connect with tutors directly?
          </div>
          <div className="collapse-content text-base font-medium">
            <span className="text-lg font-bold">Answer: </span>
            Yes! Each tutor has a profile with a messaging option. You can
            connect with them to ask questions or get learning guidance.
          </div>
        </div>

        {/* Question 5 */}
        <div className="collapse collapse-plus bg-base-100 border border-base-300 mb-4">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-bold text-lg">
            Where can I track my class progress?
          </div>
          <div className="collapse-content text-base font-medium">
            <span className="text-lg font-bold">Answer: </span>
            Go to your Dashboard and navigate to “My Courses.” There you’ll see
            completion status, upcoming assignments, and class schedules.
          </div>
        </div>

        {/* Question 6 */}
        <div className="collapse collapse-plus bg-base-100 border border-base-300 mb-4">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-bold text-lg">
            Is EduNest free to use?
          </div>
          <div className="collapse-content text-base font-medium">
            <span className="text-lg font-bold">Answer: </span>
            EduNest offers both free and premium content. Many basic courses are
            free, while advanced learning paths may require a subscription or
            one-time payment.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
