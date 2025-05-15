import { createContext, useContext, useState } from "react";

export const CartContext = createContext(null);

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    function restoreCart(tempArray) {
        setCart(tempArray);
    }

    function addToCart(product) {
        setCart(prev =>
          prev.some(item => item.name === product.name) ? prev : [...prev, { ...product, quantity: 1 }]
        );
      }

    function removeFromCart(product) {
        setCart(prev => 
            prev.filter(item => item.name != product.name)
        )
    }

    function clearCart() {
        setCart([]);
    }

    function increaseQuantity(product) {
        setCart(prevCart =>
            prevCart.map(item => {
                if (item.name === product.name) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            })
        );
    }

    function decreaseQuantity(product) {
        setCart(prevCart =>
            prevCart.map(item => {
                if (item.name === product.name) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
        );
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, restoreCart }}>
            {children}
        </CartContext.Provider>
    )
}