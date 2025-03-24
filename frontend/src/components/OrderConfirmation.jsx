import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartProducts, selectedAddress, totalAmount, email } = location.state || {};

    console.log("OrderConfirmation state:", location.state); // Debugging information

    const handlePlaceOrder = () => {
        fetch("http://localhost:4000/api/orders/place-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, cartProducts, selectedAddress, totalAmount })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Order placed successfully:", data);
                if (data.message === "Order placed successfully") {
                    navigate("/order-success");
                } else {
                    console.error("Error placing order:", data.message);
                }
            })
            .catch((error) => console.error("Error placing order:", error));
    };

    if (!Array.isArray(cartProducts) || !selectedAddress) {
        return <div className="text-center text-[#7D5A50]">Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F9F6F2]">
            <div className="container mx-auto p-8">
                
                {/* Page Header */}
                <header className="text-center mb-12">
                    <h1 className="text-6xl font-extrabold text-[#4E3629]">Order Confirmation</h1>
                    <p className="text-lg text-[#7D5A50] mt-4">
                        Review your order before placing it 🛒
                    </p>
                </header>

                {/* Products List */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-[#4E3629] mb-4">Products</h2>
                    {cartProducts.length > 0 ? (
                        cartProducts.map((product, index) => (
                            <div key={index} className="mb-4 border-b pb-4">
                                <p className="text-[#7D5A50]"><strong>Name:</strong> {product.product.name}</p>
                                <p className="text-[#7D5A50]"><strong>Price:</strong> ${product.product.price}</p>
                                <p className="text-[#7D5A50]"><strong>Quantity:</strong> {product.quantity}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-[#7D5A50]">No products in the cart.</p>
                    )}
                </div>

                {/* Delivery Address */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-[#4E3629] mb-4">Delivery Address</h2>
                    <p className="text-[#7D5A50]"><strong>Country:</strong> {selectedAddress.country}</p>
                    <p className="text-[#7D5A50]"><strong>City:</strong> {selectedAddress.city}</p>
                    <p className="text-[#7D5A50]"><strong>Address 1:</strong> {selectedAddress.address1}</p>
                    <p className="text-[#7D5A50]"><strong>Address 2:</strong> {selectedAddress.address2}</p>
                    <p className="text-[#7D5A50]"><strong>Zip Code:</strong> {selectedAddress.zipCode}</p>
                    <p className="text-[#7D5A50]"><strong>Address Type:</strong> {selectedAddress.addressType}</p>
                </div>

                {/* Total Amount */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-8 text-center">
                    <h2 className="text-2xl font-bold text-[#4E3629] mb-4">Total Amount</h2>
                    <p className="text-3xl font-extrabold text-[#8B5E3C]">${totalAmount}</p>
                </div>

                {/* Place Order Button */}
                <div className="text-center mt-8">
                    <button
                        onClick={handlePlaceOrder}
                        className="text-white text-lg font-medium bg-[#8B5E3C] hover:bg-[#6A4423] px-6 py-3 rounded-full shadow-lg transition-all duration-300"
                    >
                        Place Order
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OrderConfirmation;
