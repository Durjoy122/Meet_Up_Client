import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/">
            <div className="flex items-end gap-1">
                <img src={logo} alt="" className="h-10 w-auto" />
                <h3 className="text-3xl font-bold -ms-1">MeetUp</h3>
            </div>
        </Link>
    );
};

export default Logo;