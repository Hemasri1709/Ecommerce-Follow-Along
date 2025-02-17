import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        images: [],
        email: ''
    });

    useEffect(() => {
        fetch(`http://localhost:4000/api/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    images: data.images,
                    email: data.email
                });
            })
            .catch((error) => console.error('Error fetching product:', error));
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
            images: [...e.target.files]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('email', formData.email);
        formData.images.forEach((image, index) => {
            data.append('images', image);
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
                alert(errorData.message);
            }
        } catch (error) {
            console.error("Error:", error.message);
            alert("An error occurred while updating the product.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-500 to-black">
            <div className="w-full max-w-lg p-10 bg-black bg-opacity-50 rounded-lg shadow-2xl">
                <h2 className="text-4xl font-extrabold text-center text-white mb-8">Edit Product</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-6">
                        <label
                            htmlFor="name"
                            className="block text-lg font-medium text-gray-300 mb-2"
                        >
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-black bg-opacity-10 text-white"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="description"
                            className="block text-lg font-medium text-gray-300 mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-black bg-opacity-10 text-white"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="price"
                            className="block text-lg font-medium text-white mb-2"
                        >
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-black bg-opacity-10 text-white"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block text-lg font-medium text-gray-300 mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-black bg-opacity-10 text-white"
                        />
                    </div>
                    <div className="mb-8">
                        <label
                            htmlFor="images"
                            className="block text-lg font-medium text-white mb-2"
                        >
                            Product Images
                        </label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            multiple
                            onChange={handleImageChange}
                            required
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-black bg-opacity-10 text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 text-lg text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-lg hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProductForm;
