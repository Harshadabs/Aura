import React from "react";
import Header from "./header";
import Footer from "./footer";
import './gamepage.css'
import "./login.css";
import "./styles.css";

const diamondPackages = [
    { title: "5 diamonds", price: "₹ 13" },
    { title: "11 diamonds", price: "₹ 25" },
    { title: "14 diamonds", price: "₹ 30" },
    { title: "22 diamonds", price: "₹ 45" },
    { title: "42 diamonds", price: "₹ 75" },
    { title: "56 diamonds", price: "₹ 95" },
    { title: "86 diamonds", price: "₹ 135" },
    { title: "122 diamonds", price: "₹ 175" },
    { title: "172 diamonds", price: "₹ 275" },
    { title: "257 diamonds", price: "₹ 380" },
    { title: "344 diamonds", price: "₹ 530" },
    { title: "429 diamonds", price: "₹ 650" },
    { title: "514 diamonds", price: "₹ 730" },
    { title: "706 diamonds", price: "₹ 960" },
    { title: "1050 diamonds", price: "₹ 1420" },
    { title: "1135 diamonds", price: "₹ 1800" },
    { title: "1412 diamonds", price: "₹ 1980" },
    { title: "2195 diamonds", price: "₹ 3100" },
    { title: "2901 diamonds", price: "₹ 3850" },
    { title: "3600 diamonds", price: "₹ 4850" },
    { title: "5532 diamonds", price: "₹ 6650" },
    { title: "9288 diamonds", price: "₹ 10800" },
];

const Moba = () => {
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
                                src="static/images/mobile legends.png"
                                alt="Mobile Legends"
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
                    {diamondPackages.map((packageItem, index) => (
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
                            <div className="product-container" style={{ display: 'block'}}>
                                <span className="Item__title"> Weekly Diamond pass </span>
                            </div>
                            <span className="Item__price">₹ 140</span>

                        </a>
                    </button>

                    <button className="box grid-item pass">
                        <a href="#" className="Item__link">
                            <div className="product-container" style={{ display: 'block'}}>
                                <span className="Item__title"> Starlight pass</span>
                            </div>
                            <span className="Item__price">₹ 270</span>

                        </a>
                    </button>

                    <button className="box grid-item pass ">
                        <a href="#" className="Item__link">
                            <div className="product-container" style={{ display: 'block'}}>
                                <span className="Item__title"> Twilight pass</span>
                            </div>
                            <span className="Item__price color_change">₹ 750</span>

                        </a>
                    </button>

                </div>
            </div>
         <Footer />
    </>
  );
};

export default Moba;