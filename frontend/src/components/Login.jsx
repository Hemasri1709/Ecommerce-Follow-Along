import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userData = { email, password };
    
    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F9F6F2]">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[400px]">
        
        {/* Login Header */}
        <h2 className="text-4xl font-bold text-[#4E3629] text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-[#7D5A50]">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E3629] focus:border-[#4E3629] text-[#4E3629]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-[#7D5A50]">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E3629] focus:border-[#4E3629] text-[#4E3629]"
            />
          </div>
          <button
            type="submit"
            className="w-full text-lg font-semibold text-white bg-[#4E3629] py-3 rounded-lg hover:bg-[#7D5A50] transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-4">
          <Link to="/signup" className="text-[#4E3629] hover:underline">
            Don't have an account? <span className="font-bold">Sign up here</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
