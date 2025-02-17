import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import ProductForm from "./components/ProductForm"; 
import MyProducts from "./components/MyProducts"; 
import EditProductForm from "./components/EditProductForm"; // Import EditProductForm
import ProductInfo from "./components/ProductInfo"; // Import ProductInfo

const App = () => {
    const userEmail = "guthulahemasri410@gmail.com"; // Replace with the actual user email

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
            </Routes>
        </Router>
    );
};

export default App;