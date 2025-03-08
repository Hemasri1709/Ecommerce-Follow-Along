import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AddressForm = () => {
    const [address, setAddress] = useState({
        country: "",
        city: "",
        address1: "",
        address2: "",
        zipCode: "",
        addressType: ""
    });
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setEmail(params.get("email"));
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:4000/api/users/add-address", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, address })
        })
            .then((response) => response.json())
            .then((data) => {
                navigate(`/profile/${email}`);
            })
            .catch((error) => console.error("Error adding address:", error));
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Add Address</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-4">
                <div className="mb-4">
                    <label className="block text-gray-700">Country</label>
                    <input
                        type="text"
                        name="country"
                        value={address.country}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">City</label>
                    <input
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Address 1</label>
                    <input
                        type="text"
                        name="address1"
                        value={address.address1}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Address 2</label>
                    <input
                        type="text"
                        name="address2"
                        value={address.address2}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Zip Code</label>
                    <input
                        type="text"
                        name="zipCode"
                        value={address.zipCode}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Address Type</label>
                    <input
                        type="text"
                        name="addressType"
                        value={address.addressType}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                    Add Address
                </button>
            </form>
        </div>
    );
};

export default AddressForm;
