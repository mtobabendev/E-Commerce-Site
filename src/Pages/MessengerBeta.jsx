import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../Context/ThemeContext';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useUser } from "../Context/UserContextLuce";
import '../CSS/MessengerBeta.css';


function Messenger() {
    
    //Open Messenger Window

    const [window, setWindow] = useState('none');
    const [chatOpen, setChatOpen] = useState(false);

    function openForm() {
        setWindow("block");
        setChatOpen(true);
      }
      
      function closeForm() {
        setWindow("none");
        setChatOpen(false);
      }

        const [msgType, setMsgType] = useState('');
        
        useEffect(() => {

          let timeout;
          let i = 0;
          let text = 'Testing 1...2...3...'; /* The text in the chat window*/
          let speed = 300; /* The speed/duration of the effect in milliseconds */

          function MsgTypeLoop() {
            
            if (i < text.length) {
                setMsgType(prev => prev + text.charAt(i));
                i++;
                timeout=setTimeout(MsgTypeLoop, speed);
            }
        }

        MsgTypeLoop();

        let counter = setInterval(() => {
          i = -1;
          setMsgType('')
          MsgTypeLoop();  
        }, 10000);

        return ()=> {clearTimeout(timeout); clearTimeout(counter)}
        
    }, []);  

      //Placeholder for MultiChat & AI

      const { theme, toggleTheme } = useTheme();

      //Slide Out
      
      const [isOpen, setIsOpen] = useState(false);
      function openNav() {
        setIsOpen(true);
      }
      
      function closeNav() {
        setIsOpen(false);
      }

      //Slide Out Login

      const { currentUser, setUser, clearUser, setPasswordContext, clearPasswordContext } = useUser();

      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [validPassword, setValidPassword] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
      const [validUsername, setValidUsername] = useState(null);

      useEffect(() => {
      
      const validUpperCase = password?.match(/[A-Z]/g);
      const validLowerCase = password?.match(/[a-z]/g);
      const validNumber = password?.match(/[0-9]/g);
      const validSpecial = password?.match(/[\p{P}\p{S}]/u);
      const validLength = password?.length >= 7;

      setValidPassword(password && validUpperCase && validLowerCase && validNumber && validSpecial && validLength);
      }, [password]);

  return (
    <div id='messenger-box'>
        
        <div id='msg-main-container'>
                                
            <div id='bannerad-joker'>
              <img id='joker-left' alt='Clown Prince of Crime' title='Let&rsquo;s put a Smile on that Face!' src='Joker2.png'></img>
            </div>

            <div id='wildcard-logo'>
            <NavLink to='/aboutus'className={()=> 'arkham-navlink'}>
              <img id='messenger-wildcard' alt='WildCard DEV' title='Another WildCard Creation!' src='WildCard.png'></img>
            </NavLink>
            </div>

            <div id='bannerad-chat-title'>
              <p><sup>W</sup>h<sub>Y</sub> <sup>S</sup>o<sub> </sub>S<sup>e</sup>R<sub>i</sub>O<sup>u</sup>S<sub>?</sub></p>
            </div>

            <div id='bannerad-harley'>
              <img id='harley-left' alt='Clown Princess of Crime' title='Sorry. The voices...' src='Harley2.png'></img>
            </div>

            {/* <NavLink to='/aboutus' className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink> */}
        
        </div>

        {chatOpen ? (
        <>
          <div>
            <button className="open-button" onClick={openForm}>Chat</button>
          </div>

        <div className="chat-popup" id="myForm" style={{display: window}}>
            <div class="form-container">

                <button type="button" className="cancel-btn cancel" onClick={closeForm}>Close</button>
                
                
                <div id='mySidebar' className={`sidebar ${isOpen ? 'openSidebar' : 'closedSidebar'}`}>
                        <a href='javascript:void(0)' 
                            className='closebtn' id='closebtn'
                            onClick={() => closeNav()}><strong>X</strong></a>
                            
                            <input
                                type='text'
                                className='userName'
                                placeholder='Username'
                                // onChange={(e) => setUsername(e.target.value)}
                                // value={username}
                                name='username'
                                // onBlur={checkUsername}
                                autoComplete='one-time-code'
                            />

                            <input
                                // type={`${showPassword ? 'text' : 'password'}`}
                                className='password'
                                placeholder='Password'
                                // onChange={(e) => setPassword(e.target.value)}
                                // value={password}
                                name='password'
                                autoComplete='one-time-code'
                                // title='Password MUST be at least 8 characters & contain 1 uppercase, 1 lowercase, 1 special character & 1 number.'
                                title='
                                    &#8226; Password must be at least 8 characters.
                                    &#8226; Password must include one uppercase letter.
                                    &#8226; Password must include one lowercase letter.
                                    &#8226; Password must include one number.
                                    &#8226; Password must include one special character.
                                '
                              />

                            <button id='msg-loginbtn' disabled={validPassword ? false : true}  onClick={() => { login(); setPassword('')}}>Login</button>

                            <NavLink to='/products' id='sidelink1' state={{ category: 'Shirt' }} className={({ isActive }) => (isActive ? 'active' : '')}>Shirts</NavLink>
                            <NavLink to='/products' id='sidelink2' state={{ category: 'Pants' }} className={({ isActive }) => (isActive ? 'active' : '')}>Pants</NavLink>
                            <NavLink to='/products' id='sidelink3' state={{ category: 'Misc' }} className={({ isActive }) => (isActive ? 'active' : '')}>Misc Stuff</NavLink>
                            <NavLink to='/products' id='sidelink3' state={{ category: 'Criminal' }} className={({ isActive }) => (isActive ? 'active' : '')}>Criminal Type Stuff</NavLink>
                        </div>
                  
                  <h1 id='chat-title'>Live Chat</h1>
                
                  <button className="msg-openbtn" onClick={() => openNav()}>☰</button>

                  <button id='video-btn'>Video Chat</button>
                  <div id='msg-opt'>
                    
                    <div id='messenger-joker'>
                      <img id='bannerad-chat-left' onClick={toggleTheme} alt='Clown Prince of Crime' title='Add another Chat Window.' src='Joker2.png'></img>
                    </div>
                  
                  <label for="msg" id='msg-label'><b>Message</b></label>
                    
                    <div id='messenger-harley'>
                      <img id='bannerad-chat-right' onClick={toggleTheme} alt='Clown Princess of Crime' title='Look! Kandy is talking!' src='Harley2.png'></img>
                    </div>
                  </div>

                  <textarea placeholder={msgType} name="msg" title='You can type here...'></textarea>

                <button type="submit" className="send-btn">Send</button>
            </div>
        </div>
        </>
        )
        :
        (
        <div>
          <button className="open-button" onClick={openForm}>Chat</button>
        </div>
        )}
    </div>
  )
}

export default Messenger;