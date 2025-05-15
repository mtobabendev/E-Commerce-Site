import { useState, useEffect } from 'react';


function Typewriter() {
    
    const [type, setType] = useState('');
    
    
    useEffect(() => {
        let i = 0;
        let text = 'Lorem ipsum typing effect!'; /* The text */
        let speed = 100; /* The speed/duration of the effect in milliseconds */
        let timeout;
        function typeLoop() {

        if (i < text.length) {
            setType(prev => prev + text.charAt(i));
            i++;
            timeout=setTimeout(typeLoop, speed);
        }
    }

    typeLoop()

    let counter = setInterval(() => {
        i = -1;
        setType('')
        typeLoop();  
      }, 10000);

    return ()=> {clearTimeout(timeout); clearTimeout(counter)}
    
}, [])

  return (
            <div className='type-column'>
                <h2 id='type-title'><i>{type}</i></h2>
            </div>
  )
}

export default Typewriter