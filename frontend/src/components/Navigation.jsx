import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
            <div className="container mx-auto flex items-center justify-between px-8 py-5">
                {/* Logo or Brand Name */}
                <div className="text-white text-3xl font-extrabold">
                    <Link to="/">E-Shop</Link>
                </div>

                {/* Navigation Links */}
                <ul className="flex space-x-8">
                    <li>
                        <Link
                            to="/login"
                            className="text-white text-lg font-medium hover:text-gray-200 px-5 py-3 rounded-lg transition-all duration-200"
                        >
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/signup"
                            className="text-white text-lg font-medium hover:text-gray-200 px-5 py-3 rounded-lg transition-all duration-200"
                        >
                            Signup
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/home"
                            className="text-white text-lg font-medium hover:text-gray-200 px-5 py-3 rounded-lg transition-all duration-200"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/form"
                            className="text-white text-lg font-medium hover:text-gray-200 px-5 py-3 rounded-lg transition-all duration-200"
                        > 
                            Product Form
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/my-products"
                            className="text-white text-lg font-medium hover:text-gray-200 px-5 py-3 rounded-lg transition-all duration-200"
                        >
                            My Products
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
