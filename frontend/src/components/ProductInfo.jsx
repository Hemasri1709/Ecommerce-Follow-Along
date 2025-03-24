import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:4000/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  const handleAddToCart = () => {
    fetch("http://localhost:4000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "67b5689b220a98f43212a3be", // Replace with actual user ID
        productId: product._id,
        quantity: quantity,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        alert(`Added ${quantity} of ${product.name} to cart`);
      })
      .catch((error) => console.error("Error adding to cart:", error));
  };

  if (!product) {
    return <div className="text-center text-lg font-medium text-[#7D5A50]">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F9F6F2]">
      <div className="container mx-auto p-6">
        
        {/* Product Card */}
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-[#4E3629] text-center">{product.name}</h2>

          {/* Product Image (Smaller) */}
          <img
            src={`http://localhost:4000/uploads/${product.images[0]}`}
            alt={product.name}
            className="w-full h-56 object-cover rounded-lg my-4"
          />

          {/* Description */}
          <p className="text-md text-[#7D5A50] text-center">{product.description}</p>

          {/* Price */}
          <p className="text-2xl font-bold text-[#4E3629] text-center mt-3">${product.price}</p>

          {/* Quantity Selector */}
          <div className="mt-4 text-center">
            <label className="text-md font-medium text-[#4E3629] block mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="w-16 px-3 py-2 text-md border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-5 w-full py-3 text-md font-medium text-white bg-[#8B5E3C] hover:bg-[#6A4423] rounded-full shadow-md transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
