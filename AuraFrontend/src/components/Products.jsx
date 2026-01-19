import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "/supabaseclient.js";

const Products = () => {
  const [products, setProducts] = useState([]);
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const [selectedSizes, setSelectedSizes] = useState({});


  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setProducts(data);
      else console.error(error);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    const size = selectedSizes[product.id];
    if (!size) {
      alert("Please select a size");
      return;
    }

    const user = await supabase.auth.getUser();

    await supabase.from("cart").insert({
      product_id: product.id,
      size,
      user_id: user.data.user.id
    });

    alert("Added to cart");
  };

  const handleWishlist = async (productId) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Please login first");

    await supabase.from("wishlist").insert({
      user_id: user.id,
      product_id: productId,
    });

    alert("Added to wishlist");
  };

  return (
    <section className="products-page">
      <motion.h1 className="products-heading">
        Shop Our Collection
      </motion.h1>

      <div className="products-grid" ref={sliderRef}>
        {products.map((product, i) => (
          <motion.div
            className="product-card"
            key={product.id}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <div className="product-image-wrap">
  <motion.img
    src={`https://mljcpaxpdmlmagwjqrxg.supabase.co/storage/v1/object/public/${product.image_url}`}
    alt={product.name}
    className="product-image"
    whileHover={{ scale: 1.06 }}
    transition={{ duration: 0.3 }}
  />
</div>

            <div className="sizes">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={
                    selectedSizes[product.id] === size
                      ? "size-btn active"
                      : "size-btn"
                  }
                  onClick={() =>
                    setSelectedSizes({
                      ...selectedSizes,
                      [product.id]: size,
                    })
                  }
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-price">₹{product.price}</p>

              <div className="product-actions">

                <button
                  className="btn-outline"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  Order Now
                </button>

                <button
                  className="btn-outline"
                  onClick={() => handleWishlist(product.id)}
                >
                  Wishlist
                </button>

                <motion.button
                  className="btn-primary"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Products;
