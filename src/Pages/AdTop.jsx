import {useEffect, useState } from 'react';
import '../CSS/BannerAd.css';
import { useCart } from '../Context/CartContext';
import { useUser } from "../Context/UserContextLuce";
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { createRoot } from 'react-dom/client'


function TopAd() {

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
            <>
                    <h1 id='topad-title'>WildCard DEV - Arkham Asylum</h1>
                    <div id='bannerad-2'>
                        <div>
                        <NavLink to='/aboutus' className={({ isActive }) => (isActive ? 'active' : '')}>
                          <img className='WildCardJoker' alt='Wild Card' title='A WildCard creation.' src='WildCardJoker.jpg'></img>
                        </NavLink>
                        </div>
                        <div>
                        <img className='bannerad-right-2-pic' alt='The Girls' title='You came to the right place!' src='quinnRobbie.webp'></img>
                        </div>
                        <div>
                        <img className='bannerad-right-2-pic' alt='The Girls' title='You came to the right place!' src='poisonIvy1.webp'></img>
                        </div>
                        <div>
                        <img className='bannerad-right-2-pic' alt='The Girls' title='You came to the right place!' src='quinnRobbie2.webp'></img>
                        </div>
                        <div>
                        <img className='bannerad-right-2-pic' alt='The Girls' title='You came to the right place!' src='poisonIvy2.webp'></img>
                        </div>
                        <div>
                        <img className='bannerad-right-2-pic' alt='The Girls' title='You came to the right place!' src='quinnRobbie.webp'></img>
                        </div>
                        <div>
                        <img className='bannerad-right-2-pic' alt='The Girls' title='You came to the right place!' src='poisonIvy1.webp'></img>
                        </div>
                        <div>
                        <img className='bannerad-right-2-pic' alt='The Girls' title='You came to the right place!' src='quinnRobbie2.webp'></img>
                        </div>
                        <div>
                        <img className='bannerad-right-2-pic' alt='The Girls' title='You came to the right place!' src='poisonIvy2.webp'></img>
                        </div>
                        <div>
                        <img className='bannerad-right-2-pic' alt='The Girls' title='You came to the right place!' src='quinn-ivy.webp'></img>
                        </div>
                        <div>
                        <NavLink to='/aboutus' className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink>
                        </div>
                    </div>
            </>
        )
    }
    
export default TopAd;