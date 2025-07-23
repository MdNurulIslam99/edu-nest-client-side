import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TeacherRequestForm = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
      experience,
      title,
      category,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/teacherRequests", requestData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request Submitted",
          text: "Your teacher request has been sent to admin!",
        });
        setTitle("");
        setCategory("");
        setExperience("");
      }
    } catch (error) {
      console.error("Error submitting request", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Submission failed.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-base-200 shadow-lg mt-28 mb-10 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Become a Teacher</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Section 1: User Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Your Info</h3>
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              value={user.displayName}
              disabled
              className="w-full px-4 py-2 border rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-2 border rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium">Profile Image</label>
            <input
              type="text"
              value={user.photoURL}
              disabled
              className="w-full px-4 py-2 border rounded bg-gray-100"
            />
          </div>
        </div>

        {/* Section 2: Request Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Request Info</h3>
          <div>
            <label className="block font-medium">Experience</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            >
              <option value="" disabled>
                Select experience level
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Mid-Level">Mid-Level</option>
              <option value="Experienced">Experienced</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior JavaScript Developer"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Web Development">Web Development</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Data Science">Data Science</option>
              <option value="Cyber Security">Cyber Security</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            Submit Teacher Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherRequestForm;
