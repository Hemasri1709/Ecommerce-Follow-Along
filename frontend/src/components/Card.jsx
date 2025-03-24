import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ product, onDelete }) => {
    const imageUrl = `http://localhost:4000/uploads/${product.images[0]}`;
    console.log("Image URL:", imageUrl); // Debugging line

    return (
        <div className="bg-white shadow-lg rounded-2xl p-4 transition-all duration-300 hover:shadow-xl">
            
            {/* Product Image */}
            <Link to={`/product/${product._id}`}>
                <img 
                    src={imageUrl} 
                    alt={product.name} 
                    className="w-full h-48 object-cover rounded-xl shadow-sm"
                />
            </Link>

            {/* Product Info */}
            <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-[#5C3D2E]">{product.name}</h3>
                <p className="text-md text-[#7D5A50] mt-1">{product.description}</p>
                <p className="text-lg font-semibold text-[#9C6B3C] mt-2">${product.price}</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-between items-center">
                <Link 
                    to={`/edit/${product._id}`} 
                    className="text-[#9C6B3C] font-medium hover:text-[#7A5230] transition-all duration-200"
                >
                     Edit
                </Link>
                <button
                    onClick={() => onDelete(product._id)}
                    className="bg-[#C57B57] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#A35E3B] transition-all duration-200"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Card;
