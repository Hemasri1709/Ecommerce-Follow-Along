import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Profile = () => {
    const { email } = useParams();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/api/users/${email}`)
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch((error) => console.error("Error fetching user data:", error));

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

    if (!user) {
        return <div className="text-center text-[#4E3629] text-xl font-semibold mt-10">Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F9F6F2]">
            <div className="container mx-auto p-8">
                
                {/* Profile Header */}
                <header className="text-center mb-8">
                    <h1 className="text-5xl font-extrabold text-[#4E3629]">My Profile</h1>
                    <p className="text-lg text-[#7D5A50] mt-2">Manage your personal details & orders</p>
                </header>

                {/* Profile Details */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                    <h2 className="text-3xl font-bold text-[#4E3629]">{user.name}</h2>
                    <p className="text-[#7D5A50] text-lg"><strong>Email:</strong> {user.email}</p>

                    {/* Address Section */}
                    <h3 className="text-2xl font-bold text-[#4E3629] mt-4">Addresses</h3>
                    {user.addresses.length > 0 ? (
                        <ul className="mt-2">
                            {user.addresses.map((address, index) => (
                                <li key={index} className="border-b border-[#7D5A50] pb-2 mb-2">
                                    <p><strong>Country:</strong> {address.country}</p>
                                    <p><strong>City:</strong> {address.city}</p>
                                    <p><strong>Address 1:</strong> {address.address1}</p>
                                    <p><strong>Address 2:</strong> {address.address2}</p>
                                    <p><strong>Zip Code:</strong> {address.zipCode}</p>
                                    <p><strong>Type:</strong> {address.addressType}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-[#7D5A50] mt-2">No addresses found.</p>
                    )}

                    {/* Add Address Button */}
                    <div className="mt-4">
                        <Link to={`/add-address?email=${email}`}>
                            <button className="text-white text-lg font-medium bg-[#8B5E3C] hover:bg-[#6A4423] px-5 py-2 rounded-lg shadow-lg transition-all duration-300">
                                Add Address
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Orders Section */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-[#4E3629]">Orders</h3>
                    {orders.length > 0 ? (
                        <ul className="mt-2">
                            {orders.map((order, index) => (
                                <li key={index} className="border-b border-[#7D5A50] pb-2 mb-2">
                                    <p><strong>Order ID:</strong> {order._id}</p>
                                    <p><strong>Status:</strong> {order.status}</p>
                                    <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
                                    <p><strong>Items:</strong></p>
                                    <ul className="ml-4">
                                        {order.items.map((item, itemIndex) => (
                                            <li key={itemIndex}>
                                                <p><strong>Product:</strong> {item.product.name}</p>
                                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-[#7D5A50] mt-2">No orders found.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Profile;
