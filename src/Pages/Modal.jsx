import { useState } from 'react';
import '../CSS/Modal.css'


function Modal({ product, picture, age, isOpen, onClose}) {
    const [isAnimatingIn, setIsAnimatingIn] = useState(true);

    return (
        <div className='modal-overlay'>
            {/* If we're animating in, give it the modal-appear class. Otherwise, give it modal-disappear */}
            <div className={`modal-content ${isAnimatingIn ? 'modal-appear' : 'modal-disappear'}`}>
                <button className='modal-button' onClick={() => { 
                    setIsAnimatingIn(false);
                    setTimeout(() => {
                        onClose();
                    }, 400);
                }}>X</button>
                <img className='modal-img' title={product.title} src={product.image} />
                <h1>{product.name}</h1>
                <h4>${product.price.toFixed(2)}</h4>
                <p>{product.description}</p>
            </div>
        </div>
    )
}

export default Modal;