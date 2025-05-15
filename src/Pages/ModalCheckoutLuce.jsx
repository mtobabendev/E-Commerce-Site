import { useState } from 'react';
import '../CSS/ModalCheckout.css';
import { useCart } from '../Context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';

function ModalCheckout({ onClose, subtotal, total, shippingCost, tax }) {
    const [isAnimatingIn, setIsAnimatingIn] = useState(true);
    const [shippingData, setShippingData] = useState({
        email: '',
        shippingAddress: '',
        billingAddress: '',
        city: '',
        state: '',
        zip: '',
        cardType: '',
        cardNumber: '',
        cardName: '',
        expirationDate: '',
        cvc: ''
    });

    const { clearCart, cart } = useCart();
    const navigate = useNavigate();

    function handleChange(e) {
        // This should get the key we want to change (name) and what they're typing (value)
        const { name, value } = e.target;
        // Keeps the rest of the data intact and changes only the value of the one we want to change
        setShippingData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleConfirm() {
        // Clear cart
        clearCart();
        // Mock send an e-mail receipt
        // Go to confirmation page
        navigate('/confirmation');
    }

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
                <h2>Shipping</h2>
                <aside id="checkout-info">
                    <ul>
                        {cart.map((item, index) => {
                            const quantity = cart.find(element => element.name === item.name).quantity;
                            return <li key={index}>{item.name} x {quantity}: ${(item.price * quantity).toFixed(2)}</li>
                        })}
                        <li>Subtotal: ${subtotal}</li>
                        <li>Shipping: ${shippingCost}</li>
                        <li>Tax Rate: ${tax}</li>
                        <li>Total: ${total}</li>
                    </ul>
                </aside>
                <div id='checkout-inputs'>
                    <input value={shippingData.email} onChange={handleChange} name='email' placeholder='Email' type='email' /> 
                    <input value={shippingData.shippingAddress} onChange={handleChange} name='shippingAddress' placeholder='Shipping Address' />
                    <input value={shippingData.billingAddress} onChange={handleChange} name='billingAddress' placeholder='(Optional) Billing Address' />
                    <div id='location-info'>
                        <input value={shippingData.city} onChange={handleChange} name='city' placeholder='City' />
                        <input value={shippingData.state} onChange={handleChange} name='state' placeholder='State' />
                        <input value={shippingData.zip} onChange={handleChange} name='zip' placeholder='ZIP Code' />
                    </div>
                    <input value={shippingData.cardType} onChange={handleChange} name='cardType' placeholder='Card Type' />
                    <input value={shippingData.cardNumber} onChange={handleChange} name='cardNumber' placeholder='Card Number' />
                    <input value={shippingData.cardName} onChange={handleChange} name='cardName' placeholder='Name on Card' />
                    <input value={shippingData.expirationDate} onChange={handleChange} name='expirationDate' placeholder='Expiration Date' />
                    <input value={shippingData.cvc} onChange={handleChange} name='cvc' placeholder='CVC' />
                </div>
                <button onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    )
}

export default ModalCheckout;