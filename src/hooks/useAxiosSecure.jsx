import axios from "axios";
import React from "react";
// import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";

const axiosSecure = axios.create({
  baseURL: `https://edunest-server-side.vercel.app`,
  // https://edunest-server-side.vercel.app
  // https://edunest-server-side.vercel.app
});

const useAxiosSecure = () => {
  // const { user } = useContext(AuthContext);
  // axiosSecure.interceptors.request.use(
  //   (config) => {
  //     config.headers.Authorization = `Bearer ${user.accessToken}`;
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
  return axiosSecure;
};

export default useAxiosSecure;
