import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

const MyProducts = ({ email }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("Fetching products for email:", email); // Debugging line
    fetch(`http://localhost:4000/api/products/user/${email}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched products:", data); // Debugging line
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, [email]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter(product => product._id !== id));
        alert("Product deleted successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred while deleting the product.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="container mx-auto p-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-white">My Products</h1>
          <p className="text-lg text-gray-200 mt-4">Manage your products here</p>
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

export default MyProducts;
