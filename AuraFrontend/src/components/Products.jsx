import React from 'react';
import '/src/styles.css'; // Make sure to import the CSS

const Products = () => {
  return (
    <section className='products-wrapper'>
      <div className="products-container">
        <h2 className="products-title">Products</h2>

        <div className="products-grid">
          {[1, 2, 3 ].map((item) => (
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
      </div>
    </section>
  );
};

export default Products;
