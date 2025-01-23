import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Navigation from './components/Navigation';


const App = () => {
    return (
        <Router>
            <Navigation />  
            <Routes>
                
                <Route path="/login" element={<Login />} /> 
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    )};

export default App;






