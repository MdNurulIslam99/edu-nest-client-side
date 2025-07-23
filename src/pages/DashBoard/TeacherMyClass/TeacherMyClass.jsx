import React, { useContext, useState, useEffect } from "react";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const TeacherMyClass = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [editingClass, setEditingClass] = useState(null); // For modal edit
  const [editData, setEditData] = useState({}); // To store form inputs
  const [localClasses, setLocalClasses] = useState([]); // Local copy for instant UI update

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["myClasses", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classesByEmail?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Sync React Query data into local state whenever it changes
  useEffect(() => {
    setLocalClasses(classes);
  }, [classes]);

  // Delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your class.",
      icon: "warning",
      iconColor: "#d33", // red color for warning
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true, // swaps confirm and cancel buttons position
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleting...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        axiosSecure
          .delete(`/classes/${id}`)
          .then((res) => {
            Swal.close(); // close loading alert

            if (res.data.deletedCount > 0 || res.data.message === "Deleted") {
              setLocalClasses((prev) => prev.filter((cls) => cls._id !== id));
              Swal.fire("Deleted!", "Your class has been removed.", "success");
            } else {
              Swal.fire("Error", "Could not delete the class.", "error");
            }
          })
          .catch(() => {
            Swal.close();
            Swal.fire(
              "Error",
              "Something went wrong. Please try again.",
              "error"
            );
          });
      }
    });
  };

  // Handle modal input change
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  // Save updated class info
  const handleSaveChanges = async () => {
    try {
      const updatedClass = {
        ...editData,
        status: "pending", // reset status to pending on update
      };

      const res = await axiosSecure.put(
        `/classes/${editingClass._id}`,
        updatedClass
      );

      if (
        res.data.modifiedCount > 0 ||
        res.data.message === "Class updated successfully"
      ) {
        // Update local state to reflect changes immediately
        setLocalClasses((prev) =>
          prev.map((cls) =>
            cls._id === editingClass._id ? { ...cls, ...updatedClass } : cls
          )
        );
        setEditingClass(null);
        Swal.fire("Updated!", "Class info has been updated.", "success");
      } else {
        Swal.fire("No Change", "Nothing was updated.", "info");
      }
    } catch (error) {
      Swal.fire("Error", "Update failed.", "error");
    }
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
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-2">
        My Classes
      </h2>
      <p className="text-center text-gray-600 mt-5 mb-8">
        Manage your courses—view, update, delete, or check status—all in one
        dashboard.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {localClasses.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No classes found.
          </p>
        )}

        {localClasses.map((cls) => (
          <motion.div
            key={cls._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.05,
              rotateX: 4,
              rotateY: -4,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200 flex flex-col justify-between h-[420px]"
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
              <p className="text-sm text-gray-600">
                <strong>Name:</strong> {cls.instructorName}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {cls.instructorEmail}
              </p>
              <p className="text-sm text-gray-600 mt-2">{cls.description}</p>
              <div className="mt-2">
                <span className="badge badge-info mr-2">${cls.price}</span>
                <span className="badge badge-outline capitalize">
                  {cls.status || "pending"}
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center gap-3">
              <button
                className="btn btn-sm btn-accent"
                onClick={() => {
                  setEditingClass(cls);
                  setEditData({
                    title: cls.title,
                    price: cls.price,
                    description: cls.description,
                    image: cls.image,
                  });
                }}
              >
                <FaEdit className="mr-1" /> Update
              </button>
              <button
                className="btn btn-sm btn-error"
                onClick={() => handleDelete(cls._id)}
              >
                <FaTrash className="mr-1" /> Delete
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() =>
                  navigate(`/dashboard/teacherClassDetails/${cls._id}`)
                }
                disabled={cls.status !== "approved"}
              >
                <FaEye className="mr-1" /> See Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {editingClass && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full relative">
            <h2 className="text-center text-xl font-bold mb-4">Update Class</h2>
            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
              className="input input-bordered w-full mb-4"
            />

            <label className="block mb-2 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={editData.price}
              onChange={handleChange}
              className="input input-bordered w-full mb-4"
            />

            <label className="block mb-2 font-medium">Description</label>
            <textarea
              name="description"
              value={editData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                className="btn btn-sm"
                onClick={() => setEditingClass(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm btn-success"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherMyClass;
