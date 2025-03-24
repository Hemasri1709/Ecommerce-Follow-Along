import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [passwordErrors, setPasswordErrors] = useState([]);
    const [error, setError] = useState(null);

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 6) {
            errors.push('Password must be at least 6 characters long.');
        }
        if (!/\d/.test(password)) {
            errors.push('Password must include at least one number.');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must include at least one uppercase letter.');
        }
        if (!/[!@#$%^&*]/.test(password)) {
            errors.push('Password must include at least one special character (!@#$%^&*).');
        }
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'password') {
            setPasswordErrors(validatePassword(value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Redirect to login page after successful signup
                window.location.href = "/login";
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error("Error:", error.message);
            setError("An error occurred while signing up.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#F9F6F2]">
            <div className="bg-white shadow-lg rounded-xl p-8 w-[400px]">
                
                {/* Sign Up Header */}
                <h2 className="text-4xl font-bold text-[#4E3629] text-center mb-6">Create Account</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Sign Up Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-[#7D5A50]">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E3629] focus:border-[#4E3629] text-[#4E3629]"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-[#7D5A50]">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E3629] focus:border-[#4E3629] text-[#4E3629]"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-[#7D5A50]">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E3629] focus:border-[#4E3629] text-[#4E3629]"
                        />
                        {/* Display Password Validation Errors */}
                        <ul className="mt-3 text-sm text-red-500">
                            {passwordErrors.map((error, index) => (
                                <li key={index}>• {error}</li>
                            ))}
                        </ul>
                    </div>
                    <button
                        type="submit"
                        className="w-full text-lg font-semibold text-white bg-[#4E3629] py-3 rounded-lg hover:bg-[#7D5A50] transition-all duration-300"
                        disabled={passwordErrors.length > 0}
                    >
                        Sign Up
                    </button>
                </form>

                {/* Login Link */}
                <div className="text-center mt-4">
                    <Link to="/login" className="text-[#4E3629] hover:underline">
                        Already have an account? <span className="font-bold">Login here</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
