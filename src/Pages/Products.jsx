import { useState } from 'react'
import '../CSS/Products.css'
import productList from '../assets/products.json';
import { useCart } from '../Context/CartContext';
import Modal from './Modal'
import {useLocation} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { saveCart } from './Header';
import { useUser } from '../Context/UserContextLuce';

function Products({ category = productList.products }) {
  const { item } = useParams();
  let initialItems
  if (!item) {
    initialItems = productList.products.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
          return -1; //sort A before B
      }
      if (nameA > nameB) {
          return 1; //sortA after B
      }
      
      //if they're equal
      return 0;
  });

  } else {
    initialItems = productList.products.filter(element => element.name.toLowerCase().includes(item.toLowerCase()));
  }

  const location = useLocation();
  category = location.state?.category || category;
  const name = location.state?.name || '';
  let initialProducts = productList.products;
  if (name != '') {
    initialProducts = productList.products.filter((element) => element.name.toLowerCase().includes(name.toLowerCase()));
    console.log(initialProducts)
  }
  if (category != productList.products) {
    initialProducts = initialProducts.filter((element) => element.category == category);
  } else if (category == '') {
    
  } 
 
  const [products, setProducts] = useState(!item ? initialProducts : initialItems);
  const [modalOpen, setModalOpen] = useState(false);
  const [productIndex, setProductIndex] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // e.g
  // 1 * 2 = 12
  // 2 * 12 = 24
  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage; //should always be 0
  const currentProducts = products.slice(firstItem, lastItem); //gets everything from the first item to the last item
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const { cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const { currentUser } = useUser();

  // const gridRef = useRef(null);
  // const animationFrameRef = useRef(null);

  // useEffect(() => {

  //   return() => {
  //     console.log('navigated away from the page');
  //     if (cart.length != 0) {
  //     saveCart();
  //     }
  //   }
  // }, []);

  //
  useEffect(() => {
    saveCart(currentUser, cart);
  }, [cart]);

  useEffect(() => {
    if (!item) {
      setProducts(initialProducts);
    } else {
      setProducts(initialItems.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1; //sort A before B
        }
        if (nameA > nameB) {
            return 1; //sortA after B
        }
        
        //if they're equal
        return 0;
    }));
  }
  }, [item]);

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
    {item &&
      <p id='searchFor'>Search results for: {item} </p>
    }
    <div className='color'>
    <h2>Deals of the Day</h2>
    {modalOpen && 
      <Modal
        product={currentProducts[productIndex]}
        onClose={() => setModalOpen(false)}
      />
    }
    <main>
    {currentProducts.map((item, index) => (
        <div className='productPageDiv' key={index}>
          <div onClick={() => {
            setModalOpen(true)
            setProductIndex(index)
          }}
           style={{ cursor: 'pointer'}}>
            <h2>{item.name}</h2>
            <h4>${item.price.toFixed(2)}</h4>
            <p>{item.description}</p>
            <div className="product-container">
              <img className="productpic" title={item.title} src={item.image} />
              <div>
                <div>Hello</div>
              </div>
            </div>
          </div>
          {cart.some((element) => element.name === item.name) ? 
            <>
              <button onClick={() => {removeFromCart(item); }}>Remove from Cart</button>
              <button onClick={() => {cart.find(element => element.name === item.name).quantity <= 1 ? removeFromCart(item) : decreaseQuantity(item); }}>-</button>
              <p>Quantity: {cart.find(cartItem => cartItem => cartItem.name === item.name)?.quantity}</p>
              <button onClick={() => {increaseQuantity(item); }}>+</button>
            </>
            :
            <>
              <button onClick={() => {addToCart(item); }}>Add to Cart</button>
              <button>&#9734;</button>
              <button>&#9733;</button>
            </>
          }
        </div>
    ))}
    </main>
    <p>Products</p>
    </div>
    <div className='pagination'>
      <a id='leftarrow' className={currentPage == 1 ? 'disabled' : ''} disable={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>&laquo;</a>
        {Array.from({ length: pageCount}, (_, index) => (
          <button className={currentPage == index + 1 ? 'active' : ''} key={index} onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
        ))}
      <a id='rightarrow' onClick={() => setCurrentPage(currentPage == pageCount ? 1 : currentPage + 1)}><strong>&raquo;</strong></a>
    </div>
   </>
  )
}
export default Products;