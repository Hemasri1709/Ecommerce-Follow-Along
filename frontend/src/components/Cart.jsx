import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const userId = "67b5689b220a98f43212a3be"; // Replace with actual user ID
    const navigate = useNavigate();
    const userEmail = "vimlabhatt97@gmail.com"; // Replace with the actual user email

    useEffect(() => {
        fetch(`http://localhost:4000/api/cart/${userId}`)
            .then(response => response.json())
            .then(data => setCartProducts(data))
            .catch(error => console.error("Error fetching cart products:", error));
    }, [userId]);

    const updateQuantity = (productId, quantity) => {
        fetch(`http://localhost:4000/api/cart/update-quantity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, productId, quantity })
        })
        .then(response => response.json())
        .then(data => {
            setCartProducts(data);
        })
        .catch(error => console.error("Error updating quantity:", error));
    };

    const handlePlaceOrder = () => {
        navigate(`/select-address?email=${userEmail}&userId=${userId}`);
    };

    const validCartProducts = cartProducts.filter(product => product.product && product.product.images);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">My Cart</h1>
            {validCartProducts.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {validCartProducts.map(product => (
                            <div key={product.product._id} className="bg-white shadow-lg rounded-lg p-4">
                                <img src={`http://localhost:4000/uploads/${product.product.images[0]}`} alt={product.product.name} className="w-full h-40 object-cover rounded-md mb-4" />
                                <h2 className="text-xl font-semibold">{product.product.name}</h2>
                                <p className="text-lg font-bold text-gray-700">${product.product.price}</p>
                                <div className="flex items-center mt-4">
                                    <button onClick={() => updateQuantity(product.product._id, product.quantity - 1)} className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l">-</button>
                                    <span className="px-4">{product.quantity}</span>
                                    <button onClick={() => updateQuantity(product.product._id, product.quantity + 1)} className="bg-gray-300 text-gray-700 px-2 py-1 rounded-r">+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handlePlaceOrder}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 mt-4"
                    >
                        Place Order
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;
