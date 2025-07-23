import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //  POST: Mutation using TanStack Query
  const { mutate: addClassMutation, isLoading: isSubmitting } = useMutation({
    mutationFn: async (newClass) => {
      const res = await axiosSecure.post("/classes", newClass);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Class added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    },
    onError: (error) => {
      console.error("Error adding class:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while adding class!",
      });
    },
  });

  const onSubmit = (data) => {
    const newClass = {
      ...data,
      status: "pending",
      totalEnrollment: 0,
      createdAt: new Date().toISOString(),
      instructorName: user?.displayName,
      instructorEmail: user?.email,
    };
    addClassMutation(newClass);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-violet-600">
          Create a New Course
        </h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto text-base">
          Fill in the details below to launch your new course.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Course Info */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Course Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Course Title</label>
              <input
                {...register("title", { required: true })}
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter course title"
              />
              {errors.title && (
                <span className="text-red-500">Title is required</span>
              )}
            </div>
            <div>
              <label>Course Image URL</label>
              <input
                {...register("image", { required: true })}
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter image URL"
              />
              {errors.image && (
                <span className="text-red-500">Image URL is required</span>
              )}
            </div>
            <div className="md:col-span-2">
              <label>Description</label>
              <textarea
                {...register("description", { required: true })}
                className="w-full px-4 py-2 border rounded"
                rows="4"
                placeholder="Enter course description"
              ></textarea>
              {errors.description && (
                <span className="text-red-500">Description is required</span>
              )}
            </div>
          </div>
        </div>

        {/* Course Specifics */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Course Specifics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Category</label>
              <select
                {...register("category", { required: true })}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="">Select category</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Design">Photography</option>
                <option value="Design">Business</option>
                <option value="Design">Data Science</option>
                <option value="Design">Marketing</option>
              </select>
              {errors.category && (
                <span className="text-red-500">Category is required</span>
              )}
            </div>
            <div>
              <label>Level</label>
              <select
                {...register("level", { required: true })}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="">Select level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              {errors.level && (
                <span className="text-red-500">Level is required</span>
              )}
            </div>
            <div>
              <label>Language</label>
              <input
                {...register("language", { required: true })}
                className="w-full px-4 py-2 border rounded"
                placeholder="e.g. English"
              />
              {errors.language && (
                <span className="text-red-500">Language is required</span>
              )}
            </div>
            <div>
              <label>Duration</label>
              <input
                {...register("duration", { required: true })}
                className="w-full px-4 py-2 border rounded"
                placeholder="e.g. 10 weeks"
              />
              {errors.duration && (
                <span className="text-red-500">Duration is required</span>
              )}
            </div>
            <div>
              <label>Price ($)</label>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: true })}
                className="w-full px-4 py-2 border rounded"
              />
              {errors.price && (
                <span className="text-red-500">Price is required</span>
              )}
            </div>
            {/* <div>
              <label>Discount Price ($)</label>
              <input
                type="number"
                step="0.01"
                {...register("discount")}
                className="w-full px-4 py-2 border rounded"
              />
            </div> */}
            <div>
              <label>Total Seats</label>
              <input
                type="number"
                {...register("seats", { required: true })}
                className="w-full px-4 py-2 border rounded"
              />
              {errors.seats && (
                <span className="text-red-500">Seats are required</span>
              )}
            </div>
          </div>
        </div>

        {/* Instructor Info */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Instructor Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Instructor Name</label>
              <input
                value={user?.displayName || ""}
                readOnly
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />
            </div>
            <div>
              <label>Instructor Email</label>
              <input
                value={user?.email || ""}
                readOnly
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />
            </div>
            <div>
              <label>Qualification</label>
              <input
                {...register("qualification", { required: true })}
                className="w-full px-4 py-2 border rounded"
              />
              {errors.qualification && (
                <span className="text-red-500">Qualification is required</span>
              )}
            </div>
            <div className="md:col-span-2">
              <label>Instructor Bio</label>
              <textarea
                {...register("bio", { required: true })}
                className="w-full px-4 py-2 border rounded"
                rows="3"
              ></textarea>
              {errors.bio && (
                <span className="text-red-500">Bio is required</span>
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-violet-600 text-white rounded hover:bg-violet-700 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Add Class"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
