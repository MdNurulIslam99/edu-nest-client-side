import React, { useEffect, useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import useAxios from "../../../hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

const SignUp = () => {
  const { createUser, updatedUser, signInWithGoogle, setUser } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Mutation for saving new user (both email & Google)
  const addUserMutation = useMutation({
    mutationFn: (newUser) => axiosInstance.post("/users", newUser),
  });

  const onSubmit = (data) => {
    const { name, email, password, photoUrl, phone } = data;

    if (
      password.length < 6 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password)
    ) {
      return Swal.fire(
        "Error",
        "Password must be at least 6 chars, include a lowercase and an uppercase letter",
        "error"
      );
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updatedUser({ displayName: name, photoURL: photoUrl }).then(() => {
          setUser({
            ...user,
            displayName: name,
            photoURL: photoUrl,
            phoneNumber: phone,
          });

          const newUser = {
            name,
            email,
            photoUrl,
            phone,
            role: "student",
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          };

          addUserMutation.mutate(newUser, {
            onSuccess: () => {
              reset();
              Swal.fire("Success", "User signed up successfully!", "success");
              navigate("/");
            },
            onError: () => {
              Swal.fire("Error", "Failed to save user to DB", "error");
            },
          });
        });
      })
      .catch(() => {
        Swal.fire(
          "Error",
          "Sign up failed. Email may already be in use.",
          "error"
        );
      });
  };

  const handleGoogleSignUp = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          phone: user.phoneNumber || "",
          role: "student",
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };

        addUserMutation.mutate(userInfo, {
          onSuccess: () => {
            Swal.fire(
              "Success",
              "Signed up with Google successfully",
              "success"
            );
            navigate("/");
          },
          onError: () => {
            Swal.fire("Error", "Failed to save Google user", "error");
          },
        });
      })
      .catch(() => {
        Swal.fire("Error", "Google Sign Up failed", "error");
      });
  };

  return (
    <div className="flex justify-center mt-10 items-center py-10 px-5 md:px-0">
      <div className="w-full max-w-md p-4 rounded-xl shadow-2xl sm:p-8 bg-black text-white">
        <h2 className="mb-6 mt-3 text-3xl font-semibold text-center">
          Sign Up to your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-base font-semibold">
              User Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md text-white"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-base font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border rounded-md text-white"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-base font-semibold">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="+8801XXXXXXXXX"
              className="w-full px-3 py-2 border rounded-md text-white"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^(\+8801|8801|01)[0-9]{9}$/,
                  message: "Enter a valid BD phone number",
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-400 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Photo URL */}
          <div className="space-y-2">
            <label htmlFor="photoUrl" className="block text-base font-semibold">
              Photo URL
            </label>
            <input
              type="url"
              id="photoUrl"
              placeholder="https://example.com/photo.jpg"
              className="w-full px-3 py-2 border rounded-md text-white"
              {...register("photoUrl", { required: "Photo URL is required" })}
            />
            {errors.photoUrl && (
              <p className="text-red-400 text-sm">{errors.photoUrl.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-base font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md text-white"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-xs absolute top-2 right-5"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* OR Divider */}
          <div className="flex items-center w-full my-4">
            <hr className="w-full text-gray-600" />
            <p className="px-3 text-gray-500">OR</p>
            <hr className="w-full text-gray-600" />
          </div>

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleSignUp}
            type="button"
            className="flex items-center justify-center font-semibold w-full p-3 border rounded-md border-gray-600 hover:bg-[#0682a1] hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              viewBox="0 0 32 32"
              fill="currentColor"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
            </svg>
            Sign Up with Google
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-8 py-3 text-base font-semibold rounded-md bg-violet-600 text-white hover:bg-violet-700"
          >
            Sign Up
          </button>

          {/* Redirect to Sign In */}
          <p className="text-base text-center mt-2">
            Already have an account?
            <NavLink
              to="/signin"
              className="text-blue-400 hover:underline ml-1 font-medium"
            >
              Sign In here
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
