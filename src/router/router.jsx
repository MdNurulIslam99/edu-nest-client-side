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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts></RootLayouts>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/teacherRequestForm",
        element: (
          <PrivateRoute>
            <TeacherRequestForm></TeacherRequestForm>
          </PrivateRoute>
        ),
      },
      {
        path: "/allClassDetails/:id",
        element: (
          <PrivateRoute>
            <AllClassDetails></AllClassDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/allClasses",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "/termsCondition",
        element: <TermsConditions></TermsConditions>,
      },
      {
        path: "/brandingSection",
        element: <BrandingSection></BrandingSection>,
      },
      {
        path: "/design",
        element: <Design></Design>,
      },
      {
        path: "/marketing",
        element: <MarketingSection></MarketingSection>,
      },
      {
        path: "/advertisement",
        element: <AdvertisementSection></AdvertisementSection>,
      },
      {
        path: "/privacyPolicy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "/contact",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/faqSection",
        element: <FaqSection></FaqSection>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
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

    children: [
      {
        path: "addClass",
        element: <AddClass></AddClass>,
      },
      {
        path: "adminAllClasses",
        element: <AdminAllClasses></AdminAllClasses>,
      },
      {
        path: "allUsersTable",
        element: <AllUsersTable></AllUsersTable>,
      },
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "teacherRequest",
        element: <TeacherRequest></TeacherRequest>,
      },
      {
        path: "teacherMyClass",
        element: <TeacherMyClass></TeacherMyClass>,
      },
    ],
  },
]);
export default router;
