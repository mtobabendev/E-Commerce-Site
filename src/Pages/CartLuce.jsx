/*

- Display the cart items
    - Remove from cart button on each items
- Calculate tax/shipping/total based on their location
    - Going to need to store tax rates for different locations
    - Going to need to get their location from their profile or ask them directly
- Calculate time to ship based on their location(?) (time can just be made up)
- Checkout button
- Order confirmation message
    - Send them an email confirmation
- (optional)Recommend other products based on what's in your cart (frequently bought together items)

*/

import { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import taxRates from '../assets/taxRates.json';
import ModalCheckout from "./ModalCheckout";

function Cart() {
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(taxRates.rates[0].NE);
    const [shippingCost, setShippingCost] = useState(7.99);
    const [total, setTotal] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);

    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();

    /*
    each item                                                                                                               
    subtotal
    tax
    shippingCost
    total
    */

    useEffect(() => {
        let tempTotal = 0;
        cart.forEach((item) => {
            tempTotal += (item.price * item.quantity);
        });
        // console.log(tempTotal);
        if (tempTotal != 0) {
            setSubtotal(tempTotal.toFixed(2));
            let totalTax = ((tempTotal + shippingCost) * tax);
            // console.log(totalTax);
            setTotal(((tempTotal + shippingCost) + totalTax).toFixed(2));
        }
    }, [cart]);

    return (
        <div>
            <h1>Cart</h1>
            {modalOpen &&
                <ModalCheckout onClose={() => setModalOpen(false)} subtotal={subtotal} total={total} shippingCost={shippingCost} tax={tax} />
            }
            <div id="cart-container">
                {cart.map((item, index) => (
                    <div className="cart-item" key={index}>
                        <h2>{item.name}</h2>
                        <h4>${item.price}</h4>
                        <p>{item.description}</p>
                        <img src={item.img} />
                        <button onClick={() => { 
                            cart.find(element => element.name === item.name).quantity <= 1 ? removeFromCart(item) : decreaseQuantity(item)
                        }}>-</button>
                        <p>Quantity: {cart.find(element => element.name === item.name).quantity}</p>
                        <button onClick={() => increaseQuantity(item)}>+</button>
                        <button onClick={() => removeFromCart(item)} style={{ backgroundColor: 'red' }}>Delete</button>
                    </div>
                ))}
            </div>
            <aside id="checkout-info">
            {/* subtotal for items in cart, tax amount, total with tax, shipping estimation depending on carrier */}
                <ul>
                    {/* e.g. Microphone x 3: $150 */}
                    {cart.map((item, index) => {
                        const quantity = cart.find(element => element.name === item.name).quantity;
                        return <li key={index}>{item.name} x {quantity}: ${(item.price * quantity).toFixed(2)}</li>
                    })}
                    <li>Subtotal: ${subtotal}</li>
                    <li>Shipping: ${shippingCost}</li>
                    <li>Tax Rate: ${tax}</li>
                    <li>Total: ${total}</li>
                </ul>
                <button onClick={() => setModalOpen(true)}>Checkout</button>
            </aside>        
        </div>
    )
}

export default Cart;