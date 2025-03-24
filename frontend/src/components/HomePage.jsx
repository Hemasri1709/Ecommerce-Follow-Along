import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/products') // Adjust backend URL if needed
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
    <div className="flex items-center justify-center min-h-screen bg-[#F9F6F2]">
      <div className="container mx-auto p-8">
        
        {/* Hero Section */}
        <header className="text-center mb-12">
          <h1 className="text-6xl font-extrabold text-[#4E3629]">Savor the Perfect Brew!</h1>
          <p className="text-lg text-[#7D5A50] mt-4">
            Experience the finest coffee crafted with love ☕
          </p>
        </header>

        {/* Add Product Button */}
        <div className="text-center mb-8">
          <Link 
            to="/form" 
            className="text-white text-lg font-medium bg-[#8B5E3C] hover:bg-[#6A4423] px-6 py-3 rounded-full shadow-lg transition-all duration-300"
          >
            Add Coffee Item
          </Link>
        </div>

        {/* Product Grid */}
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
