import axios from "../../axios"; 
import React from 'react';
import '../styles/Navbar.css';
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {

            const response = await axios.post('/api/users/logout');
            
            if (response.status === 200) {
                console.log('Logged out successfully');
 
                window.location.reload(); 
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleTP = async() =>{
        navigate('/therapist');
    }
    const handleDB = async() =>{
        navigate('/');
    }
    const handleBreath = async()=>{
        navigate('/breathing')
    }
    const handleResource = async()=>{
        navigate('/resources')
    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="title" onClick={handleDB}>Whack Shack</h1>
            </div>
            <div className="navbar-right">

                <button className="therapist-btn" onClick={handleTP}>
                    Therapists
                </button>
                <button className="breathing-btn" onClick={handleBreath}>
                    IE
                </button>
                <button className="resource-btn" onClick={handleResource}>
                    Resources
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>

            </div>
        </nav>
    );
}

export default Navbar;
