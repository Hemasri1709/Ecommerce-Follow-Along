import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SelectAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [cartProducts, setCartProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setEmail(params.get("email"));
        const userId = params.get("userId");

        fetch(`http://localhost:4000/api/users/${params.get("email")}/addresses`)
            .then((response) => response.json())
            .then((data) => setAddresses(data))
            .catch((error) => console.error("Error fetching addresses:", error));

        fetch(`http://localhost:4000/api/cart/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const validData = data.filter(product => product && product.product);
                    setCartProducts(validData);
                    const total = validData.reduce((sum, product) => sum + product.product.price * product.quantity, 0);
                    setTotalAmount(total);
                } else {
                    console.error("Error fetching cart products:", data);
                }
            })
            .catch((error) => console.error("Error fetching cart products:", error));
    }, [location]);

    const handleSelectAddress = (address) => {
        setSelectedAddress(address);
    };

    const handleConfirmOrder = () => {
        if (selectedAddress) {
            navigate("/order-confirmation", {
                state: { cartProducts, selectedAddress, totalAmount }
            });
        } else {
            alert("Please select an address.");
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Select Delivery Address</h1>
            {addresses.length > 0 ? (
                <ul>
                    {addresses.map((address, index) => (
                        <li
                            key={index}
                            className={`mb-2 p-4 border rounded-lg cursor-pointer ${selectedAddress === address ? "border-blue-500" : "border-gray-300"}`}
                            onClick={() => handleSelectAddress(address)}
                        >
                            <p><strong>Country:</strong> {address.country}</p>
                            <p><strong>City:</strong> {address.city}</p>
                            <p><strong>Address 1:</strong> {address.address1}</p>
                            <p><strong>Address 2:</strong> {address.address2}</p>
                            <p><strong>Zip Code:</strong> {address.zipCode}</p>
                            <p><strong>Address Type:</strong> {address.addressType}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No addresses found.</p>
            )}
            <button
                onClick={handleConfirmOrder}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 mt-4"
            >
                Confirm Order
            </button>
        </div>
    );
};

export default SelectAddress;
