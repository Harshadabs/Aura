import React from 'react';

const Products = () => {
  return (
    <section className='productsss'>

      <div className="productsec">
        <h2>Products</h2>
  <span className="items">

<span className='item'>
    <span className="productcard">
      <a href='#' className='productlink'>
      <div className='productimg'>
        <img src='src/assets/placeholder product img.png'></img>
      </div>
      <h3 className="text-lg font-medium">Item Name</h3>
      <p className="text-sm">Description</p>
      <p>₹₹₹₹</p>
      </a>
    </span>
</span>  

<span className='item'>
    <span className="productcard">
      <a href='#' className='productlink'>
      <div className='productimg'>
        <img src='src/assets/placeholder product img.png'></img>
      </div>
      <h3 className="text-lg font-medium">Item Name</h3>
      <p className="text-sm">Description</p>
      <p>₹₹₹₹</p>
      </a>
    </span>
</span>


<div className='item'>
    <span className="productcard">
      <a href='#' className='productlink'>
      <div className='productimg'>
        <img src='src/assets/placeholder product img.png'></img>
      </div>
      <h3 className="text-lg font-medium">Item Name</h3>
      <p className="text-sm">Description</p>
      <p>₹₹₹₹</p>
      </a>
    </span>
</div>
</span>


      </div>
    </section>
  );
};

export default Products;
