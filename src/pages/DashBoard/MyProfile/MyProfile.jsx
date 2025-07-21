import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

// assuming you store user info here

const MyProfile = () => {
  const { user } = useContext(AuthContext); // from Firebase Auth
  const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setUserData(res.data);
      });
    }
  }, [user?.email, axiosSecure]);

  if (!userData) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading your profile...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto px-4 py-10"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-indigo-700">My Profile</h2>
        <p className="text-gray-500 mt-2">View your personal information</p>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 flex flex-col md:flex-row gap-6 items-center justify-center">
        <div className="avatar">
          <div className="w-36 h-36 rounded-full ring ring-indigo-300 ring-offset-base-100 ring-offset-2 overflow-hidden">
            <img
              src={userData.photoUrl || user.photoURL}
              alt="User profile"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="text-center md:text-left space-y-3">
          <h3 className="text-xl font-semibold text-indigo-600">
            {userData.name || user.displayName}
          </h3>
          <p className="text-gray-700">
            <span className="font-medium text-gray-500">Email:</span>{" "}
            {userData.email}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-gray-500">Phone:</span>{" "}
            {userData.phone || "Not provided"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-gray-500">Role:</span>{" "}
            <span className="badge badge-info badge-sm capitalize">
              {userData.role}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MyProfile;
