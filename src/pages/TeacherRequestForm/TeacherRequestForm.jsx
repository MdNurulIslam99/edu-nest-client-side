import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const TeacherRequestForm = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm();

  const [requestStatus, setRequestStatus] = useState(null);
  const [requestId, setRequestId] = useState(null);

  //  Load request data from backend if it exists
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/teacherRequests?email=${user.email}`).then((res) => {
        const existing = res.data?.[0];
        if (existing) {
          setRequestStatus(existing.status);
          setRequestId(existing._id);
        }
      });
    }
  }, [axiosSecure, user?.email]);

  //  Submit or resubmit form based on status
  const onSubmit = (data) => {
    const requestData = {
      ...data,
      status: "pending",
      image: user?.photoURL,
      email: user?.email,
      name: user?.displayName,
      requestDate: new Date().toISOString(), //  Store submission datetime
    };

    if (requestStatus === "rejected" && requestId) {
      //  Update rejected request
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
        });
    } else {
      //  Submit new request
      axiosSecure.post("/teacherRequests", requestData).then((res) => {
        if (res.data.insertedId) {
          Swal.fire("Success", "Your request has been submitted!", "success");
          setRequestStatus("pending");
          reset();
        }
      });
    }
  };

  //  Approved users message only
  if (requestStatus === "approved") {
    return (
      <div className="text-center mt-24 p-10 bg-green-100 rounded-xl text-green-800 text-xl font-semibold shadow-xl">
        🎉 You are already an approved teacher on EduNest!
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-28 p-6 rounded-2xl bg-white shadow-xl mb-20">
      {/*  Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2">
          Become an Instructor
        </h1>
        <p className="text-gray-600">
          Share your expertise and teach students across the world on EduNest!
        </p>
      </div>

      {/*  Form: Show only if no request or rejected */}
      {requestStatus !== "pending" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-6"
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

          {/*  Experience */}
          <div>
            <label className="label">Experience</label>
            <select
              {...register("experience", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Experience</option>
              <option value="beginner">Beginner</option>
              <option value="mid-level">Mid-level</option>
              <option value="experienced">Experienced</option>
            </select>
            {errors.experience && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="label">Title</label>
            <input
              type="text"
              placeholder="Ex: UI/UX Designer, MERN Stack Dev"
              className="input input-bordered w-full"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">Title is required</p>
            )}
          </div>

          {/*  Category */}
          <div className="md:col-span-2">
            <label className="label">Category</label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Choose a category</option>
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

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              className="btn bg-indigo-600 text-white hover:bg-indigo-700 w-full"
              type="submit"
            >
              {requestStatus === "rejected"
                ? "Request Another"
                : "Submit for Review"}
            </button>
          </div>
        </form>
      )}

      {/*  Pending status message */}
      {requestStatus === "pending" && (
        <div className="mt-6 text-center text-yellow-600 font-semibold">
          ⏳ Your request is under admin review.
        </div>
      )}
    </div>
  );
};

export default TeacherRequestForm;
