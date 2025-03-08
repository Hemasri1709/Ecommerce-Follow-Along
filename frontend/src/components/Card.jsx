import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ product, onDelete }) => {
    const imageUrl = `http://localhost:4000/uploads/${product.images[0]}`;
    console.log("Image URL:", imageUrl); // Debugging line

    return (
      <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow">
        <Link to={`/product/${product._id}`}>
          <img src={imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-md" />
          <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
          <p className="text-lg font-bold text-gray-700">${product.price}</p>
        </Link>
        <Link to={`/edit/${product._id}`} className="text-blue-500 hover:underline">Edit</Link> {/* Add edit button */}
        <button
          onClick={() => onDelete(product._id)}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200"
        >
          Delete
        </button>
      </div>
    );
};

export default Card;

