import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const userId = "67b5689b220a98f43212a3be"; // Replace with actual user ID
    const navigate = useNavigate();
    const userEmail = "guthulahemasri410@gmail.com"; // Replace with the actual user email

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
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-[#5C3D2E] mb-6">🛒 My Cart</h1>

            {validCartProducts.length === 0 ? (
                <p className="text-lg text-gray-600">Your cart is empty</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {validCartProducts.map(product => (
                            <div key={product.product._id} className="bg-[#FDF6EC] shadow-lg rounded-xl p-5 transition-all duration-300 hover:shadow-xl">
                                <img 
                                    src={`http://localhost:4000/uploads/${product.product.images[0]}`} 
                                    alt={product.product.name} 
                                    className="w-full h-44 object-cover rounded-lg mb-4 shadow-sm"
                                />
                                <h2 className="text-xl font-bold text-[#5C3D2E]">{product.product.name}</h2>
                                <p className="text-lg font-semibold text-[#9C6B3C] mt-1">${product.product.price}</p>

                                {/* Quantity Controls */}
                                <div className="flex items-center justify-center mt-4 bg-[#E2C799] py-2 rounded-lg shadow-md">
                                    <button 
                                        onClick={() => updateQuantity(product.product._id, product.quantity - 1)} 
                                        className="px-3 py-1 text-[#5C3D2E] font-semibold text-lg hover:bg-[#D2B48C] transition-all duration-200 rounded-l"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 text-[#5C3D2E] font-semibold">{product.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(product.product._id, product.quantity + 1)} 
                                        className="px-3 py-1 text-[#5C3D2E] font-semibold text-lg hover:bg-[#D2B48C] transition-all duration-200 rounded-r"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Place Order Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handlePlaceOrder}
                            className="bg-[#C57B57] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#A35E3B] transition-all duration-200"
                        >
                            ✅ Place Order
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
