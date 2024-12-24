import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import './gamepage.css'
const Genshin = () => {
    return (
        <>
        <Header />
        <div className="container">
        <div className="section">
          <h3>1. Input Data Game</h3>
          <div className="input-row">
            <h3>How to Top Up :</h3>
            <ol>
                <li>Enter ID & Server</li>
                <li>Select grid-item</li>
                <li>Select Payment</li>
                <li>Click Confirm Top Up & make Payment</li>
            </ol>
        </div>
      
        
          <h3>2. Select Service Amount</h3>
          
            <div className="Items grid-container">

              <button className="box grid-item">
                <a href="#" className="Item__link">
                  <div className="product-container" style="display: block;">
                  <img
                        src="static/images/Item_Genesis_Crystal.webp" 
                        alt="#" 
                        className="Image"
                    />
                  <span className="Item__title"> 60 </span>
                </div>
                  <span className="Item__price">₹ 80</span>
                
                </a>
              </button>
          
            
              <button className="box grid-item">
                <a href="#" className="Item__link">
                  <div className="product-container" style="display: block;">
                    <img
                        src="static/images/Item_Genesis_Crystal.webp" 
                        alt="#" 
                        className="Image"
                    />
                  <span className="Item__title"> 330</span>
                </div>
                  <span className="Item__price">₹ 390</span>
                
                </a>
              </button>
  
              <button className="box grid-item">
                <a href="#" className="Item__link">
                  <div className="product-container" style="display: block;">
                  <img
                        src="static/images/Item_Genesis_Crystal.webp" 
                        alt="#" 
                        className="Image"
                    />
                  <span className="Item__title"> 1090</span>
                </div>
                  <span className="Item__price">₹ 1140</span>
                
                </a>
              </button>
  
              <button className="box grid-item">
                <a href="#" className="Item__link">
                  <div className="product-container" style="display: block;">
                  <img
                        src="static/images/Item_Genesis_Crystal.webp" 
                        alt="#" 
                        className="Image"
                    />                  <span className="Item__title"> 2240</span>
                </div>
                  <span className="Item__price">₹ 2450</span>
                
                </a>
              </button>
  
              <button className="box grid-item">
                <a href="#" className="Item__link">
                  <div className="product-container" style="display: block;">
                  <img
                        src="static/images/Item_Genesis_Crystal.webp" 
                        alt="#" 
                        className="Image"
                    />                  <span className="Item__title"> 3880</span>
                </div>
                  <span className="Item__price">₹ 3750</span>
                
                </a>
              </button>
  
              <button className="box grid-item">
                <a href="#" className="Item__link">
                  <div className="product-container" style="display: block;">
                  <img
                        src="static/images/Item_Genesis_Crystal.webp" 
                        alt="#" 
                        className="Image"
                    />                  <span className="Item__title"> 8080</span>
                </div>
                  <span className="Item__price">₹ 7500</span>
                
                </a>
              </button>
  
              <button className="box grid-item">
                <a href="#" className="Item__link">
                  <div className="product-container" style="display: block;">
                    <img 
                        src="static/images/srnhhu9cip971.webp" 
                        alt="#" 
                        className="Image"
                    />
                  <span className="Item__title"> welkin moons</span>
                </div>
                  <span className="Item__price">₹ 379</span>
                </a>
              </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
    );
};

export default Genshin;