import {useEffect, useState } from 'react';
import '../CSS/BannerAd.css';
import { useCart } from '../Context/CartContext';
import { useUser } from "../Context/UserContextLuce";
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import Messenger from './Messenger';


function BannerAd() {
    
        const [type, setType] = useState('');
        
        
        useEffect(() => {
            let i = 0;
            let text = 'Check out Gotham Singles!'; /* The text */
            let speed = 300; /* The speed/duration of the effect in milliseconds */
            let timeout;
            function typeLoop() {
    
            if (i < text.length) {
                // console.log(text.charAt(i))
                setType(prev => prev + text.charAt(i)
            );
    
                i++;
                // console.log(type)
                timeout=setTimeout(typeLoop, speed);
            }
        }
        typeLoop()
        return ()=> clearTimeout(timeout)
        
    }, [])
    
    
//     let i = 0;
//     let txt = 'The often immitated, never successfully duplicated: Gotham Singles!';
//     let speed = 100;

//     function typeWriterAd() {
//     if (i < txt.length) {
//         document.getElementById("bannerad-1-title").innerHTML += txt.charAt(i);
//         i++;
//         setTimeout(typeWriterAd, speed);
//         }
//     }

//     function openForm() {
//         document.getElementById("myForm").style.display = "block";
//     }
                          
//     function closeForm() {
//         document.getElementById("myForm").style.display = "none";
//     }

// useEffect (() => {
//     typeWriterAd();
// }, []);

    return (
            
                    <div id='bannerad-1'>
                        <div className='column1'>
                        <img id='bannerad-left-1-pic' alt='The Girls' title='You came to the right place!' src='quinn-ivy.webp'></img>
                        <img id='bannerad-left-2-pic' alt='The Girls' title='Who doesnt like Red Heads!' src='poisonIvy1.webp'></img>
                        <img id='bannerad-left-3-pic' alt='The Girls' title='If she&rsquo;s not crazy, I&rsquo;m not interested.' src='quinnGaga.webp'></img>
                        </div>

                        <div className='column2'>
                        <h1 id='bannerad-1-title'><i>{type}</i></h1>
                        </div>

                        <div className='column3'>
                           
                            {/* <div id='messenger-main-container'>
                                
                                <div id='message-container-1'>
                                
                                <div id='bannerad-joker'>
                                <img id='bannerad-chat-left' alt='Clown Prince of Crime' title='Let&rsquo;s put a Smile on that Face!' src='Joker2.png'></img>
                                </div>

                                <div id='bannerad-chat-title'>
                                <p>&copy; <sup>W</sup>h<sub>Y</sub> <sup>S</sup>o<sub> </sub>S<sup>e</sup>R<sub>i</sub>O<sup>u</sup>S<sub>?</sub></p>
                                </div>

                                <div id='bannerad-harley'>
                                <img id='bannerad-chat-right' alt='Clown Princess of Crime' title='Sorry. The voices...' src='Harley2.png'></img>
                                </div>

                                {/* <NavLink to='/aboutus' className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink> 
                                </div>
                            </div> */}

                                <div id='message-container-3'>
                                <Messenger />
                                </div>
                            
                        </div>
                        
                        <div className='column4'>
                        <img id='bannerad-right-1-pic' alt='The Girls' src='quinnRobbie.webp'></img>
                        <img id='bannerad-right-2-pic' alt='The Girls' title='You may catch feelings...' src='poisonIvy2.webp'></img>
                        <img id='bannerad-right-3-pic' alt='The Girls' title='You came to the right place!' src='quinn-ivy.webp'></img>
                        </div>
                        
                    </div>

        )
    }

export default BannerAd;