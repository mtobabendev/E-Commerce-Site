import '../CSS/WildCard.css';
import {useEffect, useState, memo } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import { useCart } from '../Context/CartContext';
import { useUser } from "../Context/UserContextLuce";
import Messenger from './Messenger';
import Dice from './Dice';
import Quotes from './Quotes';

function WildCard() {

  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");

  //   const { cart } = useCart();
  //   const { currentUser, setUser, clearUser } = useUser();

  //   const [isOpen, setIsOpen] = useState(false);
  
  // function openNav() {
  //   setIsOpen(true);
  // }
  
  // function closeNav() {
  //   setIsOpen(false);
  // }

  const [wildtype, setWildType] = useState('');

  useEffect(() => {
    let i = 0;
    let text = 'WildCard DEV'; /* The text */
    let speed = 300; /* The speed/duration of the effect in milliseconds */
    let timeout;
    function wildtype() {

    if (i < text.length) {
        // console.log(text.charAt(i))
        setWildType(prev => prev + text.charAt(i)
    );

        i++;
        // console.log(type)
        timeout=setTimeout(wildtype, speed);
    }
}
wildtype()
return ()=> clearTimeout(timeout)

}, [])

    return (
            <>
                    {/* <h1 id='WildCard-title'>WildCard DEV - Arkham Asylum</h1> */}
                    <div id='WildCardBanner'>
                        
                        <div>
                        <NavLink to='/aboutus' className={({ isActive }) => (isActive ? 'active' : '')}>
                          <img id='WildCardJoker' alt='Wild Card' title='A WildCard creation.' src='WildCardJoker.jpg'></img>
                        </NavLink>
                        </div>
                        
                        <div>
                          <Dice />
                          {/* <h1 id='bannerad-1-title'><i>{wildtype}</i></h1> */}
                        </div>
                        
                        <div>
                          {/* <Messenger /> */}
                        </div>
      
                        <div>
                        <Quotes />
                        {/* <NavLink to='/aboutus' className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink> */}
                        </div>
                    
                    </div>
            </>
        )
    }
    
export default WildCard;