import React, { useContext } from "react";
import useUserRole from "../hooks/useUserRole";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { Navigate } from "react-router";

const TeacherRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (!user || role !== "teacher") {
    return (
      <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    );
  }

  return children;
};

export default TeacherRoute;
