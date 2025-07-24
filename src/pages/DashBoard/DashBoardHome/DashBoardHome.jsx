import React from "react";
import useUserRole from "../../../hooks/useUserRole";
import Loading from "../../shared/Footer/FooterPages/Loading";
import TeacherDashBoard from "./TeacherDashBoard";
import StudentDashBoard from "./StudentDashBoard";
import Forbidden from "../../Forbidden/Forbidden";
import AdminDashBoard from "./AdminDashBoard";

const DashBoardHome = () => {
  const { role, roleLoading } = useUserRole();
  if (roleLoading) {
    return <Loading></Loading>;
  }
  if (role == "admin") {
    return <AdminDashBoard></AdminDashBoard>;
  } else if (role == "teacher") {
    return <TeacherDashBoard></TeacherDashBoard>;
  } else if (role == "student") {
    return <StudentDashBoard></StudentDashBoard>;
  } else {
    return <Forbidden></Forbidden>;
  }
};

export default DashBoardHome;
