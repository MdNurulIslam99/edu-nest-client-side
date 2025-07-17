import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const TeacherRequestForm = () => {
  const axiosSecure = useAxiosSecure(); //  CHANGE: removed array destructuring
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const experienceLevel = watch("experience");
  const selectedCategory = watch("category");

  //  CHANGE: State for teacher status and request info
  const [requestStatus, setRequestStatus] = useState(null);
  const [requestId, setRequestId] = useState(null);

  //  CHANGE: Fetch existing request on component mount
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/teacherRequests?email=${user.email}`)
        .then((res) => {
          const existing = res.data?.[0];
          if (existing) {
            setRequestStatus(existing.status);
            setRequestId(existing._id);
          }
        })
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [axiosSecure, user?.email]);

  //  CHANGE: Submit or resubmit request
  const onSubmit = (data) => {
    const requestData = {
      ...data,
      status: "pending",
      image: user?.photoURL,
      email: user?.email,
      name: user?.displayName,
      requestDate: new Date().toISOString(),
    };

    if (requestStatus === "rejected" && requestId) {
      //  CHANGE: Update existing rejected request
      axiosSecure
        .put(`/teacherRequests/${requestId}`, requestData)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire(
              "Success",
              "Your request has been resubmitted!",
              "success"
            );
            setRequestStatus("pending");
          }
        })
        .catch(() => Swal.fire("Error", "Failed to resubmit!", "error"));
    } else {
      //  CHANGE: New request
      axiosSecure
        .post("/teacherRequests", requestData)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire("Success", "Your request has been submitted!", "success");
            setRequestStatus("pending");
            reset();
          }
        })
        .catch(() => Swal.fire("Error", "Failed to submit request!", "error"));
    }
  };

  //  CHANGE: Conditional UI
  if (requestStatus === "approved") {
    return (
      <div className="text-center text-green-600 font-semibold mt-10">
        🎉 You are already approved as a teacher!
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-xl shadow-2xl mt-28 mb-16">
      {/*  Title and Short Description */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">
          Become an Instructor
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Interested in sharing your knowledge? Submit your application to
          become an instructor on EduNest. Fill in the details below and wait
          for admin approval.
        </p>
      </div>

      {/*  CHANGE: Show form only if no request or rejected */}
      {requestStatus !== "pending" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              defaultValue={user?.displayName}
              readOnly
              className="input input-bordered w-full"
              {...register("name")}
            />
          </div>

          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              readOnly
              className="input input-bordered w-full"
              {...register("email")}
            />
          </div>

          {/* Experience */}
          <div>
            <label className="label">Experience</label>
            <select
              {...register("experience", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select experience</option>
              <option value="beginner">Beginner</option>
              <option value="mid-level">Mid-level</option>
              <option value="experienced">Experienced</option>
            </select>
            {errors.experience && (
              <p className="text-red-500 text-sm">Experience is required</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="label">Title</label>
            <input
              type="text"
              placeholder="e.g. Senior Web Developer"
              className="input input-bordered w-full"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">Title is required</p>
            )}
          </div>

          {/* Category */}
          <div className="md:col-span-2">
            <label className="label">Category</label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select category</option>
              <option value="Web Development">Web Development</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Data Science">Data Science</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">Category is required</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full"
              type="submit"
            >
              {requestStatus === "rejected"
                ? "Request Another"
                : "Submit for Review"}
            </button>
          </div>
        </form>
      )}

      {/*  CHANGE: If pending, show message */}
      {requestStatus === "pending" && (
        <div className="text-yellow-600 font-semibold text-center mt-6">
          ⏳ Your request is under review by admin.
        </div>
      )}

      {/* Debug watch values */}
      <div className="mt-8 bg-gray-100 p-4 rounded text-sm text-gray-600">
        <p>Selected Experience: {experienceLevel}</p>
        <p>Selected Category: {selectedCategory}</p>
      </div>
    </div>
  );
};

export default TeacherRequestForm;
