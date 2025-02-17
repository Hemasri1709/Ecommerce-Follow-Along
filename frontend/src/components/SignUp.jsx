import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [passwordErrors, setPasswordErrors] = useState([]);

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
            })

            if (response.ok) {
                // Redirect to login page or home page after successful signup
                window.location.href = "/login";
            } else {
                // Handle errors returned from the backend
                const errorData = await response.json();
                alert(errorData.message);
            }

        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-500 to-black">
            <div className="w-full max-w-lg p-10 bg-black bg-opacity-50 rounded-lg shadow-2xl">
                <h2 className="text-4xl font-extrabold text-center text-white mb-8">Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label
                            htmlFor="name"
                            className="block text-lg font-medium text-gray-300 mb-2"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-black bg-opacity-10 text-white"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block text-lg font-medium text-gray-300 mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-black bg-opacity-10 text-white"
                        />
                    </div>
                    <div className="mb-8">
                        <label
                            htmlFor="password"
                            className="block text-lg font-medium text-gray-300 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-black bg-opacity-10 text-white"
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
                        className="w-full py-3 text-lg text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-lg hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        disabled={passwordErrors.length > 0}
                    >
                        Sign Up
                    </button>
                </form>
                <div className="text-center mt-4">
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Already have an account? Login here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;

