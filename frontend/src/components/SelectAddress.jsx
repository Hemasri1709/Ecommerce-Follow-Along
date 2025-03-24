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
                state: { cartProducts, selectedAddress, totalAmount, email }
            });
        } else {
            alert("Please select an address.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F9F6F2]">
            <div className="container mx-auto p-8">
                
                {/* Page Header */}
                <header className="text-center mb-12">
                    <h1 className="text-6xl font-extrabold text-[#4E3629]">Select Delivery Address</h1>
                    <p className="text-lg text-[#7D5A50] mt-4">
                        Choose where you'd like your order delivered 📦
                    </p>
                </header>

                {/* Address List */}
                {addresses.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {addresses.map((address, index) => (
                            <li
                                key={index}
                                className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                                    selectedAddress === address
                                        ? "border-[#8B5E3C] bg-[#F3E9E1]"
                                        : "border-gray-300"
                                }`}
                                onClick={() => handleSelectAddress(address)}
                            >
                                <p className="font-semibold text-[#4E3629]">{address.addressType}</p>
                                <p className="text-[#7D5A50]">{address.address1}, {address.city}, {address.country}</p>
                                <p className="text-[#7D5A50]">{address.zipCode}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-[#7D5A50]">No addresses found.</p>
                )}

                {/* Confirm Order Button */}
                <div className="text-center mt-8">
                    <button
                        onClick={handleConfirmOrder}
                        className="text-white text-lg font-medium bg-[#8B5E3C] hover:bg-[#6A4423] px-6 py-3 rounded-full shadow-lg transition-all duration-300"
                    >
                        Confirm Order
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SelectAddress;
