import React from "react";
import { Link } from "react-router";

const ErrorCard = () => {
  return (
    <div className="">
      <div className="flex justify-center items-center flex-col py-14 gap-3 mt-20 mb-5">
        <img
          className="bg-gray-100 shadow-2xl rounded-2xl md:w-[550px] md:h-[350px] w-[350px]"
          src="/errorMassage1.jpg"
          alt=""
        />
        <h1 className="text-3xl font-bold  ">404 - Page Not Found</h1>
        <p className="md:text-lg text-base font-semibold">
          Oops! The page you're looking for doesn't exit.
        </p>
        <Link to="/">
          <button className="btn text-white bg-[#06a159] rounded-xl font-bold btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorCard;
