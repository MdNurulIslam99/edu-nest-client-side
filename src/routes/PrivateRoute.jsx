import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loading from "../pages/shared/Footer/FooterPages/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <Loading />;

  if (user && user.email) return children;

  return <Navigate to="/signin" state={location} replace />;
};

export default PrivateRoute;
