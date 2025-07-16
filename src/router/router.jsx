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
]);
export default router;
