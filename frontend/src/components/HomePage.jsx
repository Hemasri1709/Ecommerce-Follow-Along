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

  const handleDelete = (productId) => {
    fetch(`http://localhost:4000/api/products/${productId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setProducts(products.filter((product) => product._id !== productId));
        } else {
          console.error('Failed to delete product');
        }
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="container mx-auto p-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-white">Welcome to Our Store</h1>
          <p className="text-lg text-gray-200 mt-4">Discover the best products at unbeatable prices</p>
        </header>
        <div className="text-center mb-8">
          <Link to="/form" className="text-white text-lg font-medium bg-purple-500 hover:bg-purple-700 px-5 py-3 rounded-lg transition-all duration-200">
            Add Product
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product._id} product={product} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
