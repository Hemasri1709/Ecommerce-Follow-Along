import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductInfo = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:4000/api/products/${id}`)
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error('Error fetching product:', error));
    }, [id]);

    const handleAddToCart = () => {
        // Implement add to cart functionality here
        alert(`Added ${quantity} of ${product.name} to cart`);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-500 to-black">
            <div className="w-full max-w-2xl p-10 bg-black bg-opacity-50 rounded-lg shadow-2xl">
                <h2 className="text-4xl font-extrabold text-center text-white mb-8">{product.name}</h2>
                <img src={`http://localhost:4000/uploads/${product.images[0]}`} alt={product.name} className="w-full h-64 object-cover rounded-md mb-6" />
                <p className="text-lg text-white mb-4">{product.description}</p>
                <p className="text-2xl font-bold text-white mb-4">${product.price}</p>
                <div className="mb-6">
                    <label htmlFor="quantity" className="block text-lg font-medium text-white mb-2">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    onClick={handleAddToCart}
                    className="w-full py-3 text-lg text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-lg hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;
