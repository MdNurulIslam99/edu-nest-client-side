import React, { useContext } from "react";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query"; // Added TanStack Query

const TeacherMyClass = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  // Replaced useEffect + useState with TanStack useQuery
  const {
    data: classes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myClasses", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classesByEmail?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // only fetch when email is available
  });

  // Handle delete (no changes here)
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your class.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/classes/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch(); // Refetch after deletion
            Swal.fire("Deleted!", "Your class has been removed.", "success");
          }
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading your classes...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 mb-10 px-4 py-8">
      <div className="">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-2">
          My Classes
        </h2>
        <p className="text-center text-gray-600 mt-5 mb-8">
          The "My Classes" section in EduNest allows instructors to easily
          manage their own courses—view, update, delete, or check status—all in
          one organized dashboard. With a clean layout and interactive features,
          it ensures teachers stay in full control of their digital classrooms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {classes.map((cls) => (
          <div key={cls._id} style={{ perspective: 1000 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.05,
                rotateX: 4,
                rotateY: -4,
                zIndex: 10,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200 flex flex-col justify-between h-[420px] hover:shadow-2xl"
            >
              <div>
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-semibold text-indigo-600">
                  {cls.title}
                </h3>
                <p className="text-sm text-gray-600 my-1">
                  <strong>Name:</strong> {cls.instructorName}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> {cls.instructorEmail}
                </p>
                <p className="text-sm text-gray-600 mt-2">{cls.description}</p>
                <div className="mt-2">
                  <span className="badge badge-info mr-2">৳ {cls.price}</span>
                  <span className="badge badge-outline capitalize">
                    {cls.status || "pending"}
                  </span>
                </div>
              </div>

              <div className="mt-4 gap-4 flex justify-between items-center">
                <button className="btn btn-sm btn-accent">
                  <FaEdit className="mr-1" /> Update
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDelete(cls._id)}
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
                <button className="btn btn-sm btn-primary">
                  <FaEye className="mr-1" /> Details
                </button>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {!classes.length && (
        <p className="text-center text-gray-500 mt-10">No classes found.</p>
      )}
    </div>
  );
};

export default TeacherMyClass;
