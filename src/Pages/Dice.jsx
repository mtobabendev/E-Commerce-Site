import { useEffect, useState } from 'react'


function Dice() {
    
    const [number, setNumber] = useState([]);
    const [nDice, setNdice, ] = useState();
    const [total, setTotal] = useState();
    
    useEffect(() => {
        // This is still here as an example of using a useEffect to console.log for testing
        console.log(nDice);
    }, [nDice]);
    
    function D4() {
        const temp = []
        let sum = 0
        for (let i = 0; i < nDice; i++) {
            const result = Math.floor(Math.random() * 4) + 1
            temp.push(result)
            sum += temp[i]
        }
        setNumber(temp.join('+'));
        setTotal(sum);
    }

    function D6() {
        const temp = []
        let sum = 0
        for (let i = 0; i < nDice; i++) {
            const result = (Math.floor(Math.random() * 6) + 1)
            temp.push(result)
            sum += temp[i]
        }
        setNumber(temp.join('+'));
        setTotal(sum);
}

    function D8() {
        const temp = []
        let sum = 0
        for (let i = 0; i < nDice; i++) {
            const result = Math.floor(Math.random() * 8) + 1
            temp.push(result)
            sum += temp[i]
        }
        setNumber(temp.join('+'));
        setTotal(sum);
    }

    
    function D10() {
        const firstResult = Math.floor(Math.random() * 10)
        const secondResult = Math.floor(Math.random() * 10)
        setNumber(`${[firstResult,secondResult].join('')}%`);
        setTotal('N\\A');
    }
    
    function D12() {
        const temp = []
        let sum = 0
        for (let i = 0; i < nDice; i++) {
            const result = Math.floor(Math.random() * 12) + 1
            temp.push(result)
            sum += temp[i]
        }
        setNumber(temp.join('+'));
        setTotal(sum);
    }

    function D20() {
        const temp = []
        let sum = 0
        for (let i = 0; i < nDice; i++) {
            const result = Math.floor(Math.random() * 20) + 1
            temp.push(result)
            sum += temp[i]
        }
        setNumber(temp.join('+'));
        setTotal(sum);
    }

    return (
            <div>
                <img id='D4' alt='D4' src='D4.png' onClick={D4} style={{height: '30px', backgroundColor: 'green', borderRadius: '30px'}}></img>
                <img id='D6' alt='D6' src='D6.png' onClick={D6} style={{height: '30px', backgroundColor: 'green', borderRadius: '30px'}}></img>
                <img id='D8' alt='D8' src='D8.png' onClick={D8} style={{height: '30px', backgroundColor: 'green', borderRadius: '30px'}}></img>
                <img id='D10' alt='D10' src='D10.png' onClick={D10} style={{height: '30px', backgroundColor: 'green', borderRadius: '30px'}}></img>
                <img id='D12' alt='D12' src='D12.png' onClick={D12} style={{height: '30px', backgroundColor: 'green', borderRadius: '30px'}}></img>
                <img id='D20' alt='D20' src='D20.png' onClick={D20} style={{height: '30px', backgroundColor: 'green', borderRadius: '30px'}}></img>
                <br></br>
                <input type='number' id='numberOfDice' min='1' max='20' step='1'onChange={(e) => setNdice(e.target.value)} style={{width: '35px', paddingTop: '7px', backgroundColor: 'green', color: 'white', borderRadius: '10px'}}></input>
                <p style={{width: '250px'}}><b>Dice🎲:</b> <strong>{number}</strong> <b>Total: {total}</b></p>
                {/* () => function stops the functions from running automatically when the button spawns in */}
                <button id='clearbtn' onClick={() => {setNdice(0); setNumber(0); setTotal(0) }} style={{backgroundColor: 'green', color: 'purple'}}>Clear</button>
            </div>
        )};

    export default Dice;