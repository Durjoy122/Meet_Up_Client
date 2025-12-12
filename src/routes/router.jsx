import React from 'react';
import { createBrowserRouter } from "react-router";
import App from '../App.jsx';
import RootLayout from '../layouts/RootLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import Home from '../pages/Home/Home.jsx';
import Events from '../pages/Events/Events.jsx';
import Clubs from '../pages/Clubs/Clubs.jsx';
import Login from '../pages/Auth/Login/Login.jsx';
import Register from '../pages/Auth/Register/Register.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import DashboardHome from "../pages/DashboardHome/DashboardHome.jsx";
import UsersManagement from '../pages/Dashboard/UserManagement/UsersManagement.jsx';
import CreateClubs from '../pages/Clubs/CreateClubs.jsx';
import ApproveClubs from '../pages/Dashboard/ApproveClubs/ApproveClubs.jsx';
import ClubDetails from '../pages/Clubs/ClubDetails.jsx';
import Payment from '../pages/Dashboard/Payment/Payment.jsx';
import PaymentSuccess from '../pages/Dashboard/Payment/PaymentSuccess.jsx';

export const router = createBrowserRouter([
    {
         path: "/",
         Component: RootLayout,
         children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'clubs',
                Component: Clubs
            },
            {
                path: 'create-clubs',
                Component: CreateClubs,
                loader: () => fetch('/serviceCenters.json').then(res => res.json())
            },
            {
                path: 'events',
                Component: Events
            }
         ]
    },
    {
        path: 'auth',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component : Login
            }
            ,
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        Component: DashboardLayout,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: 'users-management',
                element: <UsersManagement />
            }
            ,
            {
                path: 'approve-clubs',
                element: <ApproveClubs />
            }
            ,
            {
                path: "clubs/:id",
                element: <ClubDetails />
            }
            ,
            {
                path: 'payment/:clubId',
                element: <Payment />
            }
            ,
            {
                path: 'payment-success',
                element: <PaymentSuccess />
            }
        ]
    }
]);

export default router;