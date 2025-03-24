import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    const userEmail = "guthulahemasri410@gmail.com"; // Replace with the actual user email

    return (
        <nav className="bg-[#FDF6EC] shadow-md">
            <div className="container mx-auto flex items-center justify-between px-8 py-4">
                
                {/* Logo */}
                <div className="text-[#5C3D2E] text-2xl font-bold">
                    <Link to="/">BrewHaven</Link>
                </div>

                {/* Navigation Links */}
                <ul className="flex space-x-16 ml-8"> {/* Increased space & moved right */}
                    <li>
                        <Link to="/home" className="text-[#8B5E3C] text-lg font-medium hover:text-[#6A4423] transition-all duration-200">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/form" className="text-[#8B5E3C] text-lg font-medium hover:text-[#6A4423] transition-all duration-200">
                            Product Form
                        </Link>
                    </li>
                    <li>
                        <Link to="/my-products" className="text-[#8B5E3C] text-lg font-medium hover:text-[#6A4423] transition-all duration-200">
                            My Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" className="text-[#8B5E3C] text-lg font-medium hover:text-[#6A4423] transition-all duration-200">
                            Cart
                        </Link>
                    </li>
                    <li>
                        <Link to={`/profile/${userEmail}`} className="text-[#8B5E3C] text-lg font-medium hover:text-[#6A4423] transition-all duration-200">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to={`/my-orders/${userEmail}`} className="text-[#8B5E3C] text-lg font-medium hover:text-[#6A4423] transition-all duration-200">
                            My Orders
                        </Link>
                    </li>
                </ul>

                {/* Authentication Links */}
                <div className="flex space-x-4">
                    <Link to="/login" className="bg-[#C57B57] text-white px-4 py-2 rounded-lg hover:bg-[#A35E3B] transition-all duration-200">
                        Login
                    </Link>
                    <Link to="/signup" className="bg-[#9C6B3C] text-white px-4 py-2 rounded-lg hover:bg-[#7A5230] transition-all duration-200">
                        Signup
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
