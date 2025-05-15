import { useState, useEffect } from 'react';
import '../CSS/ModalCheckOut.css'
import { useCart } from '../Context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import taxRates from '../assets/taxRates.json';


function ModalCheckout({ product, isOpen, onClose, subtotal, total, shippingCost, tax }) {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
    // const [subtotal, setSubtotal] = useState(0);
    // const [tax, setTax] = useState(taxRates.rates[0].NE);
    // const [shippingCost, setShippingCost] = useState(7.99);
    // const [total, setTotal] = useState(0);

    // useEffect(() => {
    //     let tempTotal = 0;
    //     cart.forEach((item) => {
    //         tempTotal += (item.price * item.quantity);
    //     });
    //     if (tempTotal != 0) {
    //     setSubtotal(tempTotal.toFixed(2));
    //     let totalTax =((tempTotal + shippingCost) * tax);
    //     setTotal(((tempTotal + shippingCost) + totalTax).toFixed(2));
    //     }
    // }, [cart]);

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
        CVC: ''
    });

    const { clearCart } = useCart();
    const navigate = useNavigate('/confirmation');

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
        //Clear cart
        clearCart();
        //mock send an e-mail receipt
        //Confirmation page
        navigate('/confirmation');

    }

    function order() {
        fetch('http://localhost:3000/add-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: currentUser })
        })
        .then(response => response.json())
        .then(data => console.log(data));
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
                
                <aside id='checkout-info'>
                <ul>
                    {cart.map((item, index) => {
                        const quantity = cart.find(element => element.name === item.name).quantity;
                        return <li>{item.name} x {quantity}: ${(item.price * quantity).toFixed(2)}</li>
                    })}
                    <li>Subtotal: ${subtotal}</li>
                    <li>Shipping: ${shippingCost}</li>
                    <li>Tax: {tax}%</li>
                    <li>Total: ${total}</li>
                </ul>
                <h4>Check Out</h4>
                </aside>
                
                <h2>Shipping</h2>
                <div id='checkout-inputs'>
                    <input value={shippingData.email} onChange={handleChange} name='email' placeholder='E-Mail' type='email' />
                    <input value={shippingData.shippingAddress}onChange={handleChange} name='shippingAddress' placeholder='Shipping Address' />
                    <input value={shippingData.billingAddress}onChange={handleChange} name='billingAddress' placeholder='(Optional) Billing Address' />
                <div id='location-info'>
                    <input value={shippingData.city}onChange={handleChange} name='city' placeholder='City' />
                    <input value={shippingData.state}onChange={handleChange} name='state' placeholder='State' />
                    <input value={shippingData.zip}onChange={handleChange} name='zip' placeholder='ZIP Code' />
                </div>
                    <input value={shippingData.cardType}onChange={handleChange} name='cardType' placeholder='Card Type' />
                    <input value={shippingData.cardNumber}onChange={handleChange} name='cardNumber' placeholder='Card Number' />
                    <input value={shippingData.cardName}onChange={handleChange} name='cardName' placeholder='Name on Card' />
                    <input value={shippingData.expirationDate}onChange={handleChange} name='expirationDate' placeholder='Expiration Date' />
                    <input value={shippingData.CVC}onChange={handleChange} name='CVC' placeholder='CVC' />
                </div>
                <button onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    )
}

export default ModalCheckout;