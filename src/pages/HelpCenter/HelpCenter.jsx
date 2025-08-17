import React from "react";
import { FaQuestionCircle } from "react-icons/fa"; // Import icon

const HelpCenter = () => {
  return (
    <div className="w-11/12 mx-auto bg-base-200 px-5 py-12 rounded-lg mt-20 mb-12">
      {/* Page Title */}
      <div className="text-center  mb-10">
        <h2 className="text-4xl font-bold text-indigo-700">Help Center</h2>
        <p className="mt-3 text-gray-600 max-w-4xl mx-auto">
          Find answers to common questions about EduNest. If you don’t see your
          question here, feel free to contact our support team.
        </p>
      </div>

      {/* Accordion FAQ Section */}
      <div className="space-y-3">
        {/* Q1 */}
        <div className="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title font-semibold flex items-center gap-2">
            <FaQuestionCircle className="text-indigo-500" />
            How do I create an account?
          </div>
          <div className="collapse-content text-sm">
            Click the "Sign Up" button in the top right corner and follow the
            registration process.
          </div>
        </div>

        {/* Q2 */}
        <div className="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-semibold flex items-center gap-2">
            <FaQuestionCircle className="text-indigo-500" />I forgot my
            password. What should I do?
          </div>
          <div className="collapse-content text-sm">
            Click on "Forgot Password" on the login page and follow the
            instructions sent to your email.
          </div>
        </div>

        {/* Q3 */}
        <div className="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-semibold flex items-center gap-2">
            <FaQuestionCircle className="text-indigo-500" />
            How do I update my profile information?
          </div>
          <div className="collapse-content text-sm">
            Go to "My Account" settings and select "Edit Profile" to make
            changes.
          </div>
        </div>

        {/* Q4 */}
        <div className="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-semibold flex items-center gap-2">
            <FaQuestionCircle className="text-indigo-500" />
            How do I enroll in a class?
          </div>
          <div className="collapse-content text-sm">
            Go to the "All Classes" page, select a class, and click the "Enroll"
            button. You’ll be redirected to the payment page to confirm your
            enrollment.
          </div>
        </div>

        {/* Q5 */}
        <div className="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-semibold flex items-center gap-2">
            <FaQuestionCircle className="text-indigo-500" />
            Can I see my enrolled classes?
          </div>
          <div className="collapse-content text-sm">
            Yes. After logging in, go to your dashboard and open the "My
            Enrolled Classes" section to view all your active classes.
          </div>
        </div>

        {/* Q6 */}
        <div className="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-semibold flex items-center gap-2">
            <FaQuestionCircle className="text-indigo-500" />
            How can I become a teacher on EduNest?
          </div>
          <div className="collapse-content text-sm">
            Submit a "Teacher Request" form from your dashboard. After admin
            approval, your account will be upgraded to a teacher role.
          </div>
        </div>

        {/* Q7 */}
        <div className="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-semibold flex items-center gap-2">
            <FaQuestionCircle className="text-indigo-500" />
            How do I give feedback to my teacher?
          </div>
          <div className="collapse-content text-sm">
            Go to the enrolled class details page, scroll down, and click on the
            "Give Feedback" button to share your experience.
          </div>
        </div>

        {/* Q8 */}
        <div className="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-semibold flex items-center gap-2">
            <FaQuestionCircle className="text-indigo-500" />
            Where can I see my payment history?
          </div>
          <div className="collapse-content text-sm">
            Payment history is available in your dashboard under the "My
            Payments" section. It shows all transactions with date and status.
          </div>
        </div>

        {/* Q9 */}
        <div className="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-semibold flex items-center gap-2">
            <FaQuestionCircle className="text-indigo-500" />
            What happens if a class is rejected by the admin?
          </div>
          <div className="collapse-content text-sm">
            If a class is rejected, the teacher will receive a notification and
            can update or re-submit it for approval.
          </div>
        </div>

        {/* Q10 */}
        <div className="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-semibold flex items-center gap-2">
            <FaQuestionCircle className="text-indigo-500" />
            Is my data safe on EduNest?
          </div>
          <div className="collapse-content text-sm">
            Yes. EduNest uses secure authentication (Firebase) and encrypted
            database connections (MongoDB + Express) to keep your data safe.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
