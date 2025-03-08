import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Profile = () => {
    const { email } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/api/users/${email}`)
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch((error) => console.error("Error fetching user data:", error));
    }, [email]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            <div className="bg-white shadow-lg rounded-lg p-4">
                <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
                <p className="mb-4"><strong>Email:</strong> {user.email}</p>
                <h3 className="text-xl font-bold mb-2">Addresses</h3>
                {user.addresses.length > 0 ? (
                    <ul>
                        {user.addresses.map((address, index) => (
                            <li key={index} className="mb-2">
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
                <Link to={`/add-address?email=${email}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 mt-4">
                        Add Address
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Profile;
