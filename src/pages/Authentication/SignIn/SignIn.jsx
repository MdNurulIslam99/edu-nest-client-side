import React, { useEffect, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const SignIn = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Determine redirect path after login
  const from = location.state?.pathname || "/";

  // Handle form submit
  const onSubmit = ({ email, password }) => {
    signInUser(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Signed in successfully!",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          position: "top-end",
        });
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password.",
        });
      });
  };

  // Handle Google Sign In
  const handleGoogleSignin = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Signed in with Google!",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          position: "top-end",
        });
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed",
          text: "There was an issue signing in with Google.",
        });
      });
  };

  return (
    <div className="flex justify-center mt-10 items-center py-10 px-5 md:px-0">
      <div className="w-full max-w-md p-4 rounded-xl shadow-2xl sm:p-8 bg-black text-white">
        <h2 className="mb-6 mt-3 text-3xl font-semibold text-center">
          Login to your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-base font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
                className="w-full px-3 py-2 border rounded-md text-white bg-transparent"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-base font-semibold">
                  Password
                </label>
                <NavLink
                  to="/auth/forgetPassword"
                  className="text-xs hover:underline"
                >
                  Forgot password?
                </NavLink>
              </div>
              <input
                type="password"
                id="password"
                placeholder="*****"
                {...register("password", { required: "Password is required" })}
                className="w-full px-3 py-2 border rounded-md text-white bg-transparent"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center w-full my-4">
            <hr className="w-full text-gray-600" />
            <p className="px-3 text-gray-600">OR</p>
            <hr className="w-full text-gray-600" />
          </div>

          {/* Google Sign In */}
          <div>
            <button
              onClick={handleGoogleSignin}
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
              Sign In with Google
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-8 py-3 text-lg bg-violet-600 font-semibold rounded-md text-white"
          >
            Sign in
          </button>

          {/* Signup link */}
          <p className="text-base text-center mt-4">
            Don't have an account?
            <NavLink
              to="/signup"
              className="focus:underline hover:underline text-blue-400 font-medium"
            >
              {" "}
              Sign up here
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
