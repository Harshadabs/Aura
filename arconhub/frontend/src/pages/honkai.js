import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import './gamepage.css'

const shardsPackages = [
    {"title": "60 shards", "price": "₹ 13"},
    {"title": "11 shards", "price": "₹ 25"},
    {"title": "14 shards", "price": "₹ 30"},
    {"title": "22 shards", "price": "₹ 45"},
    {"title": "42 shards", "price": "₹ 75"},
    {"title": "56 shards", "price": "₹ 95"},
]

const Honkai = () => {
    return (
        <>
            <Header />
            <div className="container ">

                <div className="section container ">
                    <h1 style={{color:' white' , textAlign: 'center'}}>LOGIN AND SERVER ID RECHARGE</h1>
                    <h3>1. Input Data Game</h3>
                    <div className="input-row">
                        <input
                            type="number"
                            placeholder="Input User ID"
                            className="input-box"
                        />
                        <input
                            type="number"
                            placeholder="Input Server ID"
                            className="input-box"
                        />
                        <div className="sidebar" style={{ marginRight: '10em' , alignItems: 'centre'}}>                            
                            <img
                                src="static/images/hsr logo.jpg"
                                alt="Honkai logo"
                                width="200px"
                                className="game-image"
                            />
                        

                        
                        <div className="instructions">
                            <h3>How to Top Up the cheapest Mobile Legends Diamonds:</h3>
                            <ol>
                                <li>Enter ID & Server</li>
                                <li>Select Item</li>
                                <li>Select Payment</li>
                                <li>Click Confirm Top Up & make Payment</li>
                                <li>diamonds will automatically be recharged into the game account</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                </div>
                <p className="instruction">
                    Please enter your User ID & Server and make sure it is correct. Example: 123456789|server-asia.
                </p>
                <h3>2. Select Service Amount</h3>
                <div className="Items grid-container">
                    {shardsPackages.map((packageItem, index) => (
                        <button
                            key={index}
                            className="box grid-item"
                            onClick={() => console.log(`Selected: ${packageItem.title}`)}
                        >
                            <a href="#" className="Item__link">
                                <div className="product-container" style={{ display: 'block' }}>
                                    <img
                                        src="static/images/dimond.png"
                                        alt="diamond"
                                        className="Image"
                                    />
                                    <span className="Item__title">{packageItem.title}</span>
                                </div>
                                <span className="Item__price">{packageItem.price}</span>
                            </a>
                        </button>
                    ))}
                    <button className="box grid-item pass">
            <a href="#" className="Item__link">
              <div className="product-container" style={{display: 'block'}}>
                <span className="Item__title">Express Supply pass</span>
              </div>
              <span className="Item__price">₹ 400</span>
            </a>
          </button>
        </div>
      </div>
         <Footer />
    </>
  );
};

export default Honkai;