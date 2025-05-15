import { useState } from "react"

export default function Confirmation({ onTest } = {}) {
    const [test, setTest] = useState(false);

    function TestFunction(username) {
        console.log(username);
    }
    // Make the handleClick the test function if it's a test
    // Otherwise, run the default Testfunction
    const handleClick = onTest || TestFunction;

    return (
        <div>
            <h1>Your order has been received.</h1>
            <button onClick={() => handleClick('Joker')}>Run</button>
            <button onClick={() => setTest(true)}>Test</button>
            {test && (
                <p>Button was clicked</p>
            )}
        </div>
    )
}