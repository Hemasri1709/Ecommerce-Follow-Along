import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

const MyProducts = ({ email }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/products/user/${email}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => setError("An error occurred while fetching products."));
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
        setError(errorData.message);
      }
    } catch (error) {
      setError("An error occurred while deleting the product.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F9F6F2]">
      <div className="container mx-auto p-8">
        
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl font-extrabold text-[#4E3629]">My Coffee Collection</h1>
          <p className="text-lg text-[#7D5A50] mt-4">Manage your delicious coffee products ☕</p>
        </header>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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

export default MyProducts;
