import axios from "axios";
import React from "react";

const axiosSecure = axios.create({
  baseURL: `http://localhost:5000`,
  // https://edunest-server-side.vercel.app
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
