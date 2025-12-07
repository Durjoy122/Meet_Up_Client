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
    }
]);

export default router;