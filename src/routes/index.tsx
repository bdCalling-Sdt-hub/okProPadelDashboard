import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/dashboard/Dashboard";
import React from "react";
import DasboardHome from "../pages/DasboardHome";
import ProductListing from "../pages/ProductListing";
import Category_Management from "../pages/Category_Management";
import Manage_Users from "../pages/Manage_Users";
import Love from "../pages/Love";
import Transactions from "../pages/Transactions";
import SettingsPage from "../pages/Settings";
import Notifications from "../pages/Notifications";
import Auth from './../layout/auth/Auth';
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import VerifyEmail from "../pages/VerifyEmail";
import SetNewPassword from "../pages/SetNewPassword";
import Seller_Profile from "../pages/Seller_Profile";
import Settings_personalInformation from "../pages/Settings_personalInformation";
import SettingsFaq from "../pages/SettingsFaq";
import SettingsTermsAndConditions from "../pages/SettingsTermsAndConditions";
import EditTermsAndCondition from "../pages/EditTermsAndConditions";



const handleNotifications = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("16++++++++++++++Notification clicked!");
    // Add your notification handling logic here
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard handleNotifications={handleNotifications} />,
        children: [
            {
                path: "/",
                element: <DasboardHome />,
            },
            {
                path: "/notifications",
                element: <Notifications />,
            },
            {
                path: "/productListing",
                element: <ProductListing />,
            },
            {
                path: "/category_management",
                element: <Category_Management />,
            },
            {
                path: "/manage-users",
                element: <Manage_Users />,
            },
            {
                path: "/manage-users/seller-profile/:id",
                element: <Seller_Profile />,
            },
            {
                path: "/love",
                element: <Love />,
            },
            {
                path: "/transactions",
                element: <Transactions />,
            },
            {
                path: "/settings",
                element: <SettingsPage />,
            },
            {
                path: "/settings/personalInformation",
                element: <Settings_personalInformation />,
            },
            {
                path: "/settings/faq",
                element: <SettingsFaq />,
            },
            {
                path: "/settings/termsAndCondition",
                element: <SettingsTermsAndConditions />
            },
            {
                path: "settings/termsAndCondition/edittermsAndConditions",
                element: <EditTermsAndCondition />
            },
        ]
    },
    {
        path: "/auth",
        element: <Auth />,
        children: [
          {
            path: "/auth",
            element: <Login />,
          },
          {
            path: "/auth/login",
            element: <Login />,
          },
          {
            path: "/auth/forget-password",
            element: <ForgetPassword />,
          },
          {
            path: "/auth/verify",
            element: <VerifyEmail />,
          },
          {
            path: "/auth/set-new-password",
            element: <SetNewPassword />,
          },
                 
        ],
      },
])

export default router;