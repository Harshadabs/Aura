import React from 'react';

const ProductCard = () => (
  <div className="bg-gray-200 w-60 h-80 flex flex-col justify-end">
    <div className="bg-black text-white p-2">
      <h3 className="text-lg font-medium">Item Name</h3>
      <p className="text-sm">Description</p>
      <p>₹₹₹₹</p>
    </div>
  </div>
);

const Products = () => {
  return (
    <section className="bg-black text-white py-10 px-6">
      <h2 className="text-2xl mb-6 text-center">Products</h2>
      <div className="flex justify-center gap-6">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
};

export default Products;
