import { useState } from 'react'
import '../CSS/App.css'
import productList from '../assets/products.json';
import { useCart } from '../Context/CartContext';
import Modal from './Modal'
import {useLocation} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import AdShady1 from './AdShady';
import Typewriter from './Typewriter';


function App() {

  const { cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  
  const [products, setProducts] = useState(productList.products);
  const [modalOpen, setModalOpen] = useState(false);
  const [productIndex, setProductIndex] = useState();
  const [wishlist, setWishlist] = useState([]);

//   const [count, setCount] = useState(0)


//   const products = [
//     {
//         name: "Blue Shirt",
//         price: 10.99,
//         description: "This thing is blue.",
//         image: "ProfilePlaceholder.png"
//     },
//     {
//         name: "Yellow Shirt",
//         price: 15.49,
//         description: "Here is a description for the yellow shirt.",
//         image: "ProfilePlaceholder2.png"
//     },
//     {
//         name: "Orange Shirt",
//         price: 1499.99,
//         description: "Prestigious orange shirt.",
//         image: "ProfilePlaceholder.png"
//     },
// ];

return (
  <>
    <div className='color'>
    <h2 id='deal'>Deals of the Day</h2>
    {modalOpen && 
      <Modal
        product={products[productIndex]}
        onClose={() => setModalOpen(false)}
      />
    }
    {products.map((item, index) => (
        <div className="productDiv" key={index}>
          <div onClick={() => {
            setModalOpen(true)
            setProductIndex(index)
          }}
           style={{ cursor: 'pointer'}}>
            <h2>{item.name}</h2>
            <h4>${item.price.toFixed(2)}</h4>
            <p>{item.description}</p>
            <img className="productpic" src={item.image} />
          </div>
          {cart.some((element) => element.name === item.name) ? 
            <>
              <button onClick={() => removeFromCart(item)}>Remove from Cart</button>
              <button onClick={() => decreaseQuantity(item)}>-</button>
              <p>Quantity: {cart.find(cartItem => cartItem => cartItem.name === item.name)?.quantity}</p>
              <button onClick={() => increaseQuantity(item)}>+</button>
            </>
            :
            <>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
              <button>&#9734;</button>
              <button>&#9733;</button>
            </>
          }
        </div>
    ))}
        {/* <div id='shadybuyzad'>
          <h2>Shop Our Questionable Sister Store!</h2>
          <h2>"Shady Buyz"</h2>
          <h3>Open from Dusk til Dawn</h3>
        <NavLink to='/products' state={{ name: 'Get Away Car' }} className={({ isActive }) => (isActive ? 'active' : '')}><img className="shadybuyzpic" src='ShadyJeff2.jpg' title='Meet our owner "Jailbird" Jeffrey B! A face you can trust!'/></NavLink>
          <h3>Fresh from the back of a stolen truck to you!</h3>
          <h4>All sales final!</h4>
        </div>

        <div id='questionablead'>
          <h2>The Slanty Shanty</h2>
          <h2>Our Merchandise is So Hot, It's Smokin'!</h2>
          <h3>Open whenever my parents go to work so I can come out of their basement to sell out of their garage.</h3>
        <NavLink to='/products' state={{ name: 'Pineapple' }} className={({ isActive }) => (isActive ? 'active' : '')}><img className="questionablepic" src='people1.jpg' title='Hours may be inconsistent as I have no girlfriend & cannot stop playing World of WarCraft long enough to run a business...'/></NavLink>
          <h3>This stuff was probably stolen from YOUR house!</h3>
          <h4>No returns, exchanges or refunds.</h4>
        </div> */}

        {/* <AdShady1 id='shady-ad-float'/> */}
        {/* <Typewriter /> */}
    </div>
   </>
  )
}
export default App;
