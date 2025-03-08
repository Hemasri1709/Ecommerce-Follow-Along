import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartProducts, selectedAddress, totalAmount } = location.state || {};

    console.log("OrderConfirmation state:", location.state); // Debugging information

    const handlePlaceOrder = () => {
        // Implement order placement logic here
        console.log("Order placed with address:", selectedAddress);
        navigate("/order-success");
    };

    if (!Array.isArray(cartProducts) || !selectedAddress) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>
            <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
                <h2 className="text-2xl font-bold mb-4">Products</h2>
                {Array.isArray(cartProducts) && cartProducts.length > 0 ? (
                    cartProducts.map((product, index) => (
                        <div key={index} className="mb-4">
                            <p><strong>Name:</strong> {product.product.name}</p>
                            <p><strong>Price:</strong> ${product.product.price}</p>
                            <p><strong>Quantity:</strong> {product.quantity}</p>
                        </div>
                    ))
                ) : (
                    <p>No products in the cart.</p>
                )}
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
                <h2 className="text-2xl font-bold mb-4">Delivery Address</h2>
                <p><strong>Country:</strong> {selectedAddress.country}</p>
                <p><strong>City:</strong> {selectedAddress.city}</p>
                <p><strong>Address 1:</strong> {selectedAddress.address1}</p>
                <p><strong>Address 2:</strong> {selectedAddress.address2}</p>
                <p><strong>Zip Code:</strong> {selectedAddress.zipCode}</p>
                <p><strong>Address Type:</strong> {selectedAddress.addressType}</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
                <h2 className="text-2xl font-bold mb-4">Total Amount</h2>
                <p className="text-xl font-bold">${totalAmount}</p>
            </div>
            <button
                onClick={handlePlaceOrder}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 mt-4"
            >
                Place Order
            </button>
        </div>
    );
};

export default OrderConfirmation;
