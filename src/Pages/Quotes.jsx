import { useEffect, useState } from 'react';


function Quotes () {
    
    const [randomQuote, setRandomQuote] = useState([]);
    const [activeQuote, setActiveQuote] = useState('');
    const quotes = 
        ['Blank',
        '\"Let\'s put a \u263A on that face!\"', 
        '\"I believe that whatever doesn\'t kill you simply makes you...Stranger.\"', 
        '\"HA. HA. HA. HA. And I thought my jokes were bad.\"', 
        '\"I\'m like a dog chasing cars. I wouldn\'t know what to do with it if I caught one.\"'];

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            console.log(activeQuote[i]);
            setActiveQuote(quotes[Math.floor(Math.random() * 4) + 1]);
            i = (i + 1) % quotes.length;
        }, 2000);

        return () => clearInterval(timer);
    }, []);

    function QuoteBTN() {
        const temp = [] 
        for (let i = 0; i < 1; i++) {
            const result = Math.floor(Math.random() * 3) + 1
            temp.push(result)
            console.log(temp)
        }
        setRandomQuote(quotes[temp]);
    }
    
    return (
        <div className='quote-container'>
            <p>{activeQuote}</p> 
            <button onClick={QuoteBTN}
            style={{borderRadius: '10px', color: 'purple', backgroundColor: 'green'}}>Quote
            </button>
            <p>{randomQuote}</p>
        </div>
        )
    }

export default Quotes;
