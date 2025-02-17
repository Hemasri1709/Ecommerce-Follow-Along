import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetching products from the backend API
    fetch('http://localhost:4000/api/products')  // Adjust the URL to your backend's URL
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-500 to-black">
      <div className="container mx-auto p-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-white">Welcome to Our Store</h1>
          <p className="text-lg text-gray-200 mt-4">Discover the best products at Reasonable prices</p>
        </header>
        <div className="text-center mb-8">
          <Link to="/form" className="text-white text-lg font-medium bg-gradient-to-r from-green-400 to-teal-500 hover:bg-gradient-to-l px-5 py-3 rounded-lg transition-all duration-200">
            Add Product
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
