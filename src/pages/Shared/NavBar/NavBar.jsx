import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import Logo from '../../../components/Logo/Logo';
import useAuth from '../../../hooks/useAuth';
import { FaUserCircle } from "react-icons/fa";

const NavBar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut()
            .then(() => navigate("/auth/login"))
            .catch((error) => console.error(error));
    };

    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/clubs">Clubs</NavLink></li>
            <li><NavLink to="/events">Events</NavLink></li>
            {
            user && <>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink to="/create-clubs">Create Clubs</NavLink></li>
            </>
        }
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>
                <span className="btn btn-ghost text-xl">
                    <Logo />
                </span>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL || "https://i.ibb.co/0Jmshvb/avatar.png"}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                            ) : (
                                <FaUserCircle className="text-3xl text-gray-700" />
                            )}
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li className="font-semibold px-2 text-center">{user.displayName || "User"}</li>
                            <li><button className="text-left" onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <Link className="btn" to="/auth/login">Log in</Link>
                )}
            </div>
        </div>
    );
};

export default NavBar;