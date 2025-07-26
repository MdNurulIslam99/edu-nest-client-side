import axios from "axios";
import React from "react";

const axiosSecure = axios.create({
  baseURL: `https://edunest-server-side.vercel.app`,
  // https://edunest-server-side.vercel.app
  // http://localhost:5000
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
