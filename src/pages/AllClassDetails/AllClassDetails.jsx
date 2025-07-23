import React from "react";
import { useParams, useNavigate } from "react-router";
import { FaUser, FaMoneyBill, FaUserGraduate } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

//  changed: import useQuery from TanStack
import { useQuery } from "@tanstack/react-query";

const AllClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  //  changed: fetch class data using useQuery instead of useEffect
  const {
    data: classData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["classDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
      return res.data;
    },
    enabled: !!id, //  only run when ID is available
  });

  const handlePay = () => {
    navigate(`/coursePayment/${id}`);
  };

  if (isLoading) {
    return (
      <div className="text-center mt-20 text-xl font-semibold text-gray-500">
        Loading class details...
      </div>
    );
  }

  if (isError || !classData) {
    return (
      <div className="text-center mt-20 text-xl font-semibold text-red-500">
        Failed to load class details.
      </div>
    );
  }

  const {
    title,
    instructorName,
    instructorEmail,
    price,
    image,
    description,
    totalEnrollment = 0,
    duration,
    category,
  } = classData;

  return (
    <div className="max-w-7xl mx-auto mt-20 mb-10 px-4 py-10">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-700">Class Details</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mt-2">
          Dive into one of EduNest’s expertly crafted classes. Learn new skills
          from certified professionals, track your progress, and level up with
          Smart Education!
        </p>
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-200 shadow-lg rounded-2xl overflow-hidden p-6">
        {/* Left Image */}
        <img
          src={image}
          alt={title}
          className="rounded-xl w-full h-80 object-cover"
        />

        {/* Right Content */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-indigo-600">{title}</h2>
            <p className="text-gray-700">{description}</p>

            <div className="text-sm text-gray-500 space-y-1">
              <p className="flex items-center gap-2">
                <FaUser className="text-indigo-500" />
                Instructor:
                <span className="font-medium">{instructorName}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaUserGraduate className="text-green-500" />
                Total Enrolled: {totalEnrollment}
              </p>
              <p className="flex items-center gap-2">
                📧 Email: <span>{instructorEmail}</span>
              </p>
              <p className="flex items-center gap-2">📚 Category: {category}</p>
              <p className="flex items-center gap-2">⏳ Duration: {duration}</p>
              <p className="flex items-center gap-2">
                <FaMoneyBill className="text-green-600" />
                Price: <span className="text-lg font-bold">${price}</span>
              </p>
            </div>
          </div>

          {/* Pay Button */}
          <div className="mt-6">
            <button
              onClick={handlePay}
              className="btn btn-primary w-full text-lg rounded-xl"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClassDetails;
