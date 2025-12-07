import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../pages/Shared/NavBar/NavBar.jsx';
import Footer from '../pages/Shared/Footer/Footer.jsx';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayout;