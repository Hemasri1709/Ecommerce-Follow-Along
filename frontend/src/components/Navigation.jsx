import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo or Brand Name */}
                <div className="text-white text-xl font-bold">
                    <Link to="/">MyApp</Link>
                </div>

                {/* Navigation Links */}
                <ul className="flex space-x-6">
                    <li>
                        <Link
                            to="/login"
                            className="text-white text-sm font-medium hover:text-gray-200 px-4 py-2 rounded-lg transition-all duration-200"
                        >
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/signup"
                            className="text-white text-sm font-medium hover:text-gray-200 px-4 py-2 rounded-lg transition-all duration-200"
                        >
                            Signup
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;