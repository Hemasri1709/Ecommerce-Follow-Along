import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MyOrders = () => {
    const { email } = useParams();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/api/orders/user-orders/${email}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "User orders fetched successfully") {
                    setOrders(data.orders);
                } else {
                    console.error("Error fetching user orders:", data.message);
                }
            })
            .catch((error) => console.error("Error fetching user orders:", error));
    }, [email]);

    const handleCancelOrder = (orderId) => {
        fetch("http://localhost:4000/api/orders/cancel-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ orderId })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Order canceled successfully") {
                    setOrders((prevOrders) =>
                        prevOrders.map((order) =>
                            order._id === orderId ? { ...order, status: "Canceled" } : order
                        )
                    );
                } else {
                    console.error("Error canceling order:", data.message);
                }
            })
            .catch((error) => console.error("Error canceling order:", error));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F9F6F2]">
            <div className="container mx-auto p-8">
                
                {/* Orders Header */}
                <header className="text-center mb-8">
                    <h1 className="text-5xl font-extrabold text-[#4E3629]">My Orders</h1>
                    <p className="text-lg text-[#7D5A50] mt-2">Track your recent purchases</p>
                </header>

                {/* Orders List */}
                {orders.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {orders.map((order, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                                <p className="text-xl font-bold text-[#4E3629] mb-2">
                                    Order ID: <span className="text-[#7D5A50]">{order._id}</span>
                                </p>
                                <p className="text-lg text-[#7D5A50]"><strong>Status:</strong> {order.status}</p>
                                <p className="text-lg text-[#7D5A50]"><strong>Total Amount:</strong> ${order.totalAmount}</p>
                                <p className="text-lg font-bold text-[#4E3629] mt-4">Items:</p>
                                <ul className="ml-4 text-[#7D5A50]">
                                    {order.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="mb-2">
                                            <p><strong>Product:</strong> {item.product.name}</p>
                                            <p><strong>Quantity:</strong> {item.quantity}</p>
                                        </li>
                                    ))}
                                </ul>

                                {/* Cancel Order Button with New Brown Color */}
                                {order.status !== "Canceled" && (
                                    <button
                                        onClick={() => handleCancelOrder(order._id)}
                                        className="text-white text-lg font-medium bg-[#8B5E3C] hover:bg-[#6A4423] px-5 py-2 rounded-lg shadow-lg transition-all duration-300 mt-4"
                                    >
                                        Cancel Order
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-[#7D5A50] text-xl">No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
