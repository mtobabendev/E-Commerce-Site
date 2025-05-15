import { useState } from "react";
import { useUser } from "../Context/UserContextLuce";
import '../CSS/MenuLuce.css'

function Menu() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Getting our state and functions from the context
    const { currentUser, setUser, clearUser } = useUser();

    return (
        <>
            {/* If there's a current user, display that, otherwise they are not logged in */}
            {currentUser ? (
                <h2>You are logged in as {currentUser}</h2>
            )
            :
            (
                <h2>You are not logged in</h2>
            )}
            <input
                placeholder="Username" 
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <input 
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button onClick={() => setUser(username)}>Sign in</button>
            <img id="cartpic" src='cartIcon.png' />
            <nav></nav> 
        </>
    )
}

export default Menu;