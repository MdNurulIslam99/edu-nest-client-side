import React from "react";

const LogoSection = () => {
  return (
    <div className="flex items-center gap-3 p-4">
      <img
        src="/logoEduNest.png" // Replace with your actual logo path
        alt="Website Logo"
        className="h-10 w-10 object-contain"
      />
      <h1 className="text-xl font-bold ">EduNest</h1>
    </div>
  );
};

export default LogoSection;
