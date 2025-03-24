import React, { useState } from "react";

const ProductForm = ({ email }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        images: [],
        email: email, // Initialize email from props
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            images: [...e.target.files],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("email", formData.email);
        formData.images.forEach((image) => {
            data.append("images", image);
        });

        try {
            const response = await fetch("http://localhost:4000/api/products", {
                method: "POST",
                body: data,
            });

            if (response.ok) {
                alert("Product added successfully!");
                setFormData({
                    name: "",
                    description: "",
                    price: "",
                    images: [],
                    email: email,
                });
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            alert("An error occurred while adding the product.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F9F6F2]">
            <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg border border-gray-200">
                <h2 className="text-4xl font-extrabold text-center text-[#4E3629] mb-6">
                    Add New Coffee Item
                </h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block text-lg font-medium text-[#7D5A50]">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#8B5E3C]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-medium text-[#7D5A50]">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#8B5E3C]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-medium text-[#7D5A50]">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#8B5E3C]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-medium text-[#7D5A50]">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            required
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-[#7D5A50]">
                            Product Images
                        </label>
                        <input
                            type="file"
                            name="images"
                            multiple
                            onChange={handleImageChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#8B5E3C]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 text-lg text-white bg-[#8B5E3C] hover:bg-[#6A4423] rounded-md transition-all duration-200"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
