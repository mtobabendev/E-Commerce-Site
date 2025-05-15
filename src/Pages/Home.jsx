import {useState, useEffect } from 'react';
import "../CSS/Home.css";
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import products from '../assets/products.json';

function Home() {
    // .push loads the new output objects into the array (have to put {} around the output to make it a new array) i=index

    // const slides = []
    // for (let i = 0; i < products.products.length; i++) {
    //     slides.push({title: products.products[i].name, img: products.products[i].image});
    // }

    // const [slideState, setSlideState] = useState(slides);

// ------------------------------------------------------------------------------------
    // item= object in the Array, i=index

    // const slides = []
    // products.products.forEach((item, i) => {
    //     slides.push({title: products.products[i].name, img: products.products[i].image});
    // });

    // const [slideState, setSlideState] = useState(slides);

// ---------------------------------------------------------------------------------------
    // item= object in the Array, i=index

    const slides = products.products.map((item, i) => {
        return {name: products.products[i].name, img: products.products[i].image, title: products.products[i].title}});

    const [slideState, setSlideState] = useState(slides);

// ----------------------------------------------------------------------------------------

    // const slides = [

    //     { title: products.products[0].name, img: products.products[0].image },
    //     { title: products.products[1].name, img: products.products[1].image },
    //     { title: products.products[2].name, img: products.products[2].image },
    //     { title: products.products[3].name, img: products.products[3].image },
    //     { title: products.products[4].name, img: products.products[4].image },
    //     { title: products.products[5].name, img: products.products[5].image }
    // ];

    const [slideIndex, setSlideIndex] = useState(0);
    const [prevSlide, setPrevSlide] = useState();
    const [arrowStop, setArrowStop] = useState(false);
    
    let interval;

    useEffect(() => {
        if (arrowStop) {
            clearInterval(interval);
            return;
        }        
        interval = setInterval(() => {
            setSlideIndex((prev) => {
                setPrevSlide(prev);
                return (prev + 1) % slides.length; // the % slides.length wraps it back around to the beginning when it's at the end
            })
        }, 3000);
        
        return () => clearInterval(interval);        
    }, [arrowStop]);
    
    function plusSlides(n) {
        setPrevSlide(slideIndex);
        const newIndex = (slideIndex + n + slides.length) % slides.length;
        setSlideIndex(newIndex);
    }
    
    // from https://www.w3schools.com/howto/howto_js_slideshow.asp
    return (
            <div className='main'>
                <div className='slideshow-container'>
                    {slideState.map((item, index) => (
                    <>
                    <a className='arrow prev' onClick={() => { plusSlides(-1); setArrowStop (true)}}>&#10094;</a>
                    <NavLink to='/products' state={{ name: item.title }} className={({ isActive }) => (isActive ? 'active' : '')}>
                        <div
                            key={index}
                            className={`slide ${index === slideIndex ? 'active' : index === prevSlide ? 'previous' : ''}`}
                            style={{ backgroundImage: `url(${item.img})`}}
                            title={item.title}
                        >
                            <h3 className='text'>{item.name}</h3>
                        </div>
                    </NavLink>
                    <a className='arrow next' onClick={() => { plusSlides(1); setArrowStop (true)}}>&#10095;</a>
                    </>
                ))}
                </div>
            </div>
    )
}

export default Home;