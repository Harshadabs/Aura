import React, { useRef } from 'react';
import '/src/styles.css';

const Products = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const { current } = sliderRef;
    const scrollAmount = 300; // adjust as needed
    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  return (
    <section className='products-wrapper'>
      <div className="products-container">
        <h2 className="products-title">Products</h2>

        <div className="slider-controls">
          <button className="slider-btn" onClick={() => scroll('left')}>&lt;</button>
          <div className="products-slider" ref={sliderRef}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <div className="product-card" key={item}>
                <div className="product-img">
                  <img src="src/assets/placeholder product img.png" alt="Product" />
                </div>
                <div className="product-info">
                  <h3 className="item-name">Item Name</h3>
                  <p className="item-desc">Description</p>
                  <p className="item-price">₹₹₹₹</p>
                </div>
              </div>
            ))}
          </div>
          <button className="slider-btn" onClick={() => scroll('right')}>&gt;</button>
        </div>
      </div>
    </section>
  );
};

export default Products;
