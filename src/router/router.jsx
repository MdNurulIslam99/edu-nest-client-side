import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../pages/Home/Home";
import SignIn from "../pages/Authentication/SignIn/SignIn";
import SignUp from "../pages/Authentication/SignUp/SignUp";
import TermsConditions from "../pages/shared/Footer/FooterPages/TermsConditions";
import PrivacyPolicy from "../pages/shared/Footer/FooterPages/PrivacyPolicy";
import ContactUs from "../pages/shared/Footer/FooterPages/ContactUs";
import FaqSection from "../pages/shared/Footer/FooterPages/FaqSection";
import BrandingSection from "../pages/shared/Footer/FooterPages/BrandingSection";
import Design from "../pages/shared/Footer/FooterPages/Design";
import MarketingSection from "../pages/shared/Footer/FooterPages/MarketingSection";
import AdvertisementSection from "../pages/shared/Footer/FooterPages/AdvertisementSection";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import AddClass from "../pages/DashBoard/Teacher/AddClass";
import TeacherRequestForm from "../pages/TeacherRequestForm/TeacherRequestForm";
import AllClasses from "../pages/AllClasses/AllClasses";
import TeacherRequest from "../pages/DashBoard/TeacherRequest/TeacherRequest";
import TeacherMyClass from "../pages/DashBoard/TeacherMyClass/TeacherMyClass";
import AdminAllClasses from "../pages/DashBoard/AdminAllClasses/AdminAllClasses";
import AllUsersTable from "../pages/DashBoard/AllUsersTable/AllUsersTable";
import MyProfile from "../pages/DashBoard/MyProfile/MyProfile";
import AllClassDetails from "../pages/AllClassDetails/AllClassDetails";
import CoursePayment from "../pages/DashBoard/CoursePayment/CoursePayment";
import MyEnrollClass from "../pages/DashBoard/MyEnrollClass/MyEnrollClass";
import MyEnrollClassDetails from "../pages/DashBoard/MyEnrollClassDetails/MyEnrollClassDetails";
import TeacherClassDetails from "../pages/DashBoard/TeacherClassDetails/TeacherClassDetails";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import TeacherRoute from "../routes/TeacherRoute";
import DashBoardHome from "../pages/DashBoard/DashBoardHome/DashBoardHome";
import HelpCenter from "../pages/HelpCenter/HelpCenter";
import ErrorCard from "../pages/ErrorCard/ErrorCard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts></RootLayouts>,
    errorElement: <ErrorCard></ErrorCard>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "/teacherRequestForm",
        element: (
          <PrivateRoute>
            <TeacherRequestForm></TeacherRequestForm>
          </PrivateRoute>
        ),
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "/allClassDetails/:id",
        element: (
          <PrivateRoute>
            <AllClassDetails></AllClassDetails>
          </PrivateRoute>
        ),
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "/coursePayment/:id",
        element: (
          <PrivateRoute>
            <CoursePayment></CoursePayment>
          </PrivateRoute>
        ),
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "/allClasses",
        element: <AllClasses></AllClasses>,
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "/helpCenter",
        element: <HelpCenter></HelpCenter>,
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "/termsCondition",
        element: <TermsConditions></TermsConditions>,
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "/brandingSection",
        element: <BrandingSection></BrandingSection>,
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "/design",
        element: <Design></Design>,
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "/marketing",
        element: <MarketingSection></MarketingSection>,
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "/advertisement",
        element: <AdvertisementSection></AdvertisementSection>,
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "/privacyPolicy",
        element: <PrivacyPolicy></PrivacyPolicy>,
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "/contact",
        element: <ContactUs></ContactUs>,
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "/faqSection",
        element: <FaqSection></FaqSection>,
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "/forbidden",
        element: <Forbidden></Forbidden>,
        errorElement: <ErrorCard></ErrorCard>,
      },
    ],
  },
  {
    path: "/dashBoard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>,
      </PrivateRoute>
    ),
    errorElement: <ErrorCard></ErrorCard>,

    children: [
      {
        index: true,
        element: <DashBoardHome></DashBoardHome>,
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "addClass",
        element: <AddClass></AddClass>,
        errorElement: <ErrorCard></ErrorCard>,
      },

      {
        path: "adminAllClasses",
        element: (
          <AdminRoute>
            <AdminAllClasses></AdminAllClasses>,
          </AdminRoute>
        ),
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "allUsersTable",
        element: (
          <AdminRoute>
            <AllUsersTable></AllUsersTable>,
          </AdminRoute>
        ),
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>,
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "teacherRequest",
        element: (
          <AdminRoute>
            <TeacherRequest></TeacherRequest>
          </AdminRoute>
        ),
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "teacherMyClass",
        element: (
          <TeacherRoute>
            <TeacherMyClass></TeacherMyClass>
          </TeacherRoute>
        ),
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "teacherClassDetails/:id",
        element: (
          <TeacherRoute>
            <TeacherClassDetails></TeacherClassDetails>
          </TeacherRoute>
        ),
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "myEnrollClass",
        element: <MyEnrollClass></MyEnrollClass>,
        errorElement: <ErrorCard></ErrorCard>,
      },
      {
        path: "myEnrollClassDetails/:id",
        element: <MyEnrollClassDetails></MyEnrollClassDetails>,
        errorElement: <ErrorCard></ErrorCard>,
      },
    ],
  },
]);
export default router;
