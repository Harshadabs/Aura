import React from 'react';

const Products = () => {
  return (
    <section className='productsss'>
      <div className="productsec">
  <div className='title'>
    <h2>Products</h2>
  </div>

  <div className='div1'>
    <div className="productcard">
      <a href='#' className='productlink'>
        <div className='productimg'>
          <img src='src/assets/placeholder product img.png' alt='Product'/>
        </div>
        <h3 className="item_name">Item Name</h3>
        <p className="item_des">Description</p>
        <p className='shop-button button'>₹₹₹₹</p>
      </a>
    </div>
  </div>  

<div className='div2'>
    <div className="productcard">
      <a href='#' className='productlink'>
        <div className='productimg'>
          <img src='src/assets/placeholder product img.png' alt='Product'/>
        </div>
        <h3 className="item_name">Item Name</h3>
        <p className="item_des">Description</p>
        <p className='shop-button button'>₹₹₹₹</p>
      </a>
    </div>
  </div>  

<div className='div3'>
    <div className="productcard">
      <a href='#' className='productlink'>
        <div className='productimg'>
          <img src='src/assets/placeholder product img.png' alt='Product'/>
        </div>
        <h3 className="item_name">Item Name</h3>
        <p className="item_des">Description</p>
        <p className='shop-button button'>₹₹₹₹</p>
      </a>
    </div>
  </div>  
</div>

    </section>
  );
};

export default Products;
