import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { Link } from "react-router"; //
import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";

const MyEnrollClass = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: enrolledClasses = [], isLoading } = useQuery({
    queryKey: ["myEnrollClasses", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolled-classes/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/*  TITLE SECTION */}
      <div className="text-center my-10">
        <h2 className="text-4xl font-bold text-primary">My Enrolled Classes</h2>
        <p className="text-gray-600 mt-2">
          All your enrolled learning journeys in one place.
        </p>
      </div>

      {/*  CARD GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledClasses.map((singleClass) => (
          <motion.div
            key={singleClass._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -10,
              scale: 1.03,
              zIndex: 10, //  ADD HOVER Z-INDEX
              boxShadow: "0px 15px 30px rgba(0,0,0,0.15)", //  HOVER EFFECT
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="card card-compact w-full bg-base-100 shadow-xl border relative"
          >
            {/*  CLASS IMAGE */}
            <figure>
              <img
                src={singleClass.image}
                alt="class image"
                className="h-48 w-full object-cover"
              />
            </figure>

            {/*  CARD BODY */}
            <div className="card-body">
              <h2 className="card-title text-xl">{singleClass.title}</h2>
              <p className="text-gray-500">
                Instructor: {singleClass.instructorName || "Unknown"}{" "}
                {/*  FIXED FIELD */}
              </p>

              {/*  CONTINUE BUTTON */}
              <div className="card-actions justify-end">
                <Link
                  to={`/dashboard/myEnrollClassDetails/${singleClass.classId}`}
                >
                  {/*  FIXED ROUTE PATH TO point to details page */}
                  <button className="btn btn-primary btn-sm text-white">
                    <FaBookOpen className="mr-2" /> Continue
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrollClass;
