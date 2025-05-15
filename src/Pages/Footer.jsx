import {useEffect, useState } from 'react';
import '../CSS/Footer.css';
import { useCart } from '../Context/CartContext';
import { useUser } from "../Context/UserContextLuce";
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { createRoot } from 'react-dom/client'


function Footer() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { cart } = useCart();
    const { currentUser, setUser, clearUser } = useUser();

    const [isOpen, setIsOpen] = useState(false);
  
  function openNav() {
    setIsOpen(true);
  }
  
  function closeNav() {
    setIsOpen(false);
  }

    return (
            
                    <footer>
                        <p>&copy; <sup>J</sup>o<sub>K</sub>e<sup>R</sup> i<sup>N</sup>c. 2025</p>
                        <button onClick={() => {
                            document.documentElement.scrollTop = 0;
                        }}>Back to Top</button>

                        <NavLink to='/aboutus' className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink>
                    </footer>

        )
    }
    
export default Footer;