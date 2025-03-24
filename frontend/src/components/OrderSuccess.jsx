import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F9F6F2]">
            <div className="container mx-auto p-8 text-center">
                
                {/* Success Header */}
                <header className="mb-12">
                    <h1 className="text-6xl font-extrabold text-[#4E3629]">Order Successful! 🎉</h1>
                    <p className="text-lg text-[#7D5A50] mt-4">
                        Thank you for your order! Your delicious items are on the way. ☕🚀
                    </p>
                </header>

                {/* Success Illustration */}
                <div className="flex justify-center mb-8">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/726/726496.png" // Replace with your success icon
                        alt="Order Success"
                        className="w-40 h-40"
                    />
                </div>

                {/* Go to Home Button */}
                <div className="text-center">
                    <Link to="/home">
                        <button className="text-white text-lg font-medium bg-[#8B5E3C] hover:bg-[#6A4423] px-6 py-3 rounded-full shadow-lg transition-all duration-300">
                            Go to Home
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default OrderSuccess;
