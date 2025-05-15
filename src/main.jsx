import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './CSS/index.css'
import App from './Pages/App.jsx'
import Menu from './Pages/MenuLuce.jsx'
import { CartProvider } from './Context/CartContext.jsx'
import { UserProvider } from './Context/UserContextLuce.jsx'
import { ThemeProvider } from './Context/ThemeContext.jsx'
import Home from './Pages/Home.jsx'
import Header from './Pages/Header.jsx'
import Products from './Pages/Products.jsx'
import Cart from './Pages/Cart.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './Pages/Footer.jsx'
import AboutUs from './Pages/AboutUs.jsx'
import Confirmation from './Pages/Confirmation.jsx'
import BannerAd from './Pages/AdBanner.jsx'
import TopAd from './Pages/AdTop.jsx'
import AdShady1 from './Pages/AdShady.jsx'
import WildCard from './Pages/WildCard.jsx'
import Dice from './Pages/Dice.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <CartProvider>
        <ThemeProvider>
          <Router>
            {/* <TopAd /> */}
            <WildCard />
              <Header />
                {/* <BannerAd /> */}
                  <Routes>
                    <Route path='/' element={<><Home /> <App /></>}></Route>
                    {/* Optionally we can go to something like /products/BlueShirt */}
                    <Route path='/products/:item?' element={<Products />}></Route>
                    <Route path='/cart' element={<Cart />}></Route>
                    <Route path='/aboutus' element={<AboutUs />}></Route>
                    <Route path='/confirmation' element={<Confirmation />} />
                    <Route path='/aboutus' element={<AboutUs />}></Route>
                  </Routes>
                {/* <AdShady1 /> */}
            <Footer />
          </Router>
        </ThemeProvider>
        {/* <Home />
        {/* <Menu /> */}
        {/* <App /> */}
      </CartProvider>
    </UserProvider>
  </StrictMode>,
)


/*

open command prompt (search cmd in search bar)
cd ..
cd ..
cd MAMP\bin\mysql\bin
mysqld --port=3306 --datadir="C:\MAMP\db\mysql"

*/