import '../CSS/Cart.css'
import { useState, useEffect } from 'react';
import { useCart } from "../Context/CartContext";
import taxRates from '../assets/taxRates.json';
import ModalCheckout from './ModalCheckOut';
import { useUser } from '../Context/UserContextLuce';
import { saveCart } from './Header';


function Cart () {
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(taxRates.rates[0].NE);
    const [shippingCost, setShippingCost] = useState(7.99);
    const [total, setTotal] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);

    const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

    useEffect(() => {
        let tempTotal = 0;
        cart.forEach((item) => {
            tempTotal += (item.price * item.quantity);
        });
        if (tempTotal != 0) {
        setSubtotal(tempTotal.toFixed(2));
        let totalTax =((tempTotal + shippingCost) * tax);
        setTotal(((tempTotal + shippingCost) + totalTax).toFixed(2));
        } else {
            setSubtotal(0);
            setTotal(0);
        }
    }, [cart]);
    
    // const { cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
    const { currentUser } = useUser();

    useEffect(() => {
        saveCart(currentUser, cart);
      }, [cart]);

    return (
        <div>
            <h1>Cart</h1>
            {
            modalOpen && 
            <ModalCheckout onClose={() => setModalOpen(false)} subtotal={subtotal} total={total} shippingCost={shippingCost} tax={tax}/>
            }
            <div id='cart-container'>
                {cart.map((item, index) => (
                    <div className='cart-item' key={index}>
                        <h2>{item.name}</h2>
                        <h4>${item.price}</h4>
                        <p>{item.description}</p>
                        <img className="productpic" src={item.image} />
                        <button onClick={() => {
                            cart.find(element => element.name === item.name).quantity <= 1 ? removeFromCart(item) : decreaseQuantity(item)
                            }}>-</button>
                        <p>Quantity: {cart.find(element => element.name === item.name).quantity}</p>
                        <button onClick={() => increaseQuantity(item)}>+</button>
                        <button onClick={() => removeFromCart(item)} style={{ backgroundColor: 'red' }}>Delete</button>
                    </div>
                ))}
            </div>
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
                <h4></h4>
                <button onClick={() => setModalOpen(true)}>CheckOut</button>
            </aside>
        </div>
    )
}

export default Cart;