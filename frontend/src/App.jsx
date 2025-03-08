import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import ProductForm from "./components/ProductForm"; 
import MyProducts from "./components/MyProducts"; 
import EditProductForm from "./components/EditProductForm"; // Import EditProductForm
import ProductInfo from "./components/ProductInfo"; // Import ProductInfo
import Cart from "./components/Cart"; // Import Cart
import Profile from "./components/Profile"; // Import Profile
import AddressForm from "./components/AddressForm"; // Import AddressForm
import SelectAddress from "./components/SelectAddress"; // Import SelectAddress
import OrderConfirmation from "./components/OrderConfirmation"; // Import OrderConfirmation

const App = () => {
    const userEmail = "vimlabhatt97@gmail.com"; // Replace with the actual user email

    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<HomePage />} /> {/* Add route for HomePage */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/form" element={<ProductForm email={userEmail} />} /> {/* Pass email to ProductForm */}
                <Route path="/my-products" element={<MyProducts email={userEmail} />} /> 
                <Route path="/edit/:id" element={<EditProductForm />} /> {/* Add route for EditProductForm */}
                <Route path="/product/:id" element={<ProductInfo />} /> {/* Add route for ProductInfo */}
                <Route path="/cart" element={<Cart />} /> {/* Add route for Cart */}
                <Route path="/profile/:email" element={<Profile />} /> {/* Update route for Profile */}
                <Route path="/add-address" element={<AddressForm email={userEmail} />} /> {/* Add route for AddressForm */}
                <Route path="/select-address" element={<SelectAddress />} /> {/* Add route for SelectAddress */}
                <Route path="/order-confirmation" element={<OrderConfirmation />} /> {/* Add route for OrderConfirmation */}
            </Routes>
        </Router>
    );
};

export default App;