import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AddressForm = () => {
    const [address, setAddress] = useState({
        country: "",
        city: "",
        address1: "",
        address2: "",
        zipCode: "",
        addressType: "",
    });

    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setEmail(params.get("email"));
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:4000/api/users/add-address", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, address }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    navigate(`/profile/${email}`);
                } else {
                    setError(data.message);
                }
            })
            .catch((error) => {
                console.error("Error adding address:", error);
                setError("An error occurred while adding the address.");
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F9F6F2]">
            <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg max-w-lg">
                
                {/* Header */}
                <h1 className="text-4xl font-extrabold text-[#4E3629] text-center mb-6">Add Address</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Address Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {["Country", "City", "Address 1", "Address 2", "Zip Code", "Address Type"].map((field, index) => (
                        <div key={index}>
                            <label className="block text-[#7D5A50] font-medium">{field}</label>
                            <input
                                type="text"
                                name={field.toLowerCase().replace(" ", "")}
                                value={address[field.toLowerCase().replace(" ", "")]}
                                onChange={handleChange}
                                className="border border-gray-300 p-3 rounded-lg w-full text-[#4E3629] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                                required={field !== "Address 2"}
                            />
                        </div>
                    ))}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#8B5E3C] hover:bg-[#6A4423] text-white font-medium px-4 py-3 rounded-lg shadow-lg transition-all duration-300"
                    >
                        Add Address
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddressForm;
