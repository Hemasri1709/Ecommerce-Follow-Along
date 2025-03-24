import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        images: [],
        email: "",
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/api/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    images: data.images,
                    email: data.email,
                });
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                setError("An error occurred while fetching the product.");
            });
    }, [id]);

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
            const response = await fetch(`http://localhost:4000/api/products/${id}`, {
                method: "PUT",
                body: data,
            });

            if (response.ok) {
                alert("Product updated successfully!");
                navigate("/my-products");
            } else {
                const errorData = await response.json();
                console.error("Error response:", errorData);
                setError(errorData.message);
            }
        } catch (error) {
            console.error("Error:", error.message);
            setError("An error occurred while updating the product.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDF6EC]">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-[#5C3D2E] text-center mb-6">Edit Product</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg font-medium text-[#8B5E3C] mb-1">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#8B5E3C]"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-[#8B5E3C] mb-1">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#8B5E3C]"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-lg font-medium text-[#8B5E3C] mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#8B5E3C]"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-[#8B5E3C] mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#8B5E3C]"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-[#8B5E3C] mb-1">Product Images</label>
                            <input
                                type="file"
                                name="images"
                                multiple
                                onChange={handleImageChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#8B5E3C]"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            type="submit"
                            className="w-full max-w-xs px-6 py-3 bg-[#C57B57] text-white text-lg font-semibold rounded-lg hover:bg-[#A35E3B] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C57B57] focus:ring-offset-2"
                        >
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductForm;
