import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "/supabaseClient";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("cart")
      .select(`
        id,
        quantity,
        product:products (
          name,
          price
        )
      `);

    setCart(
      data.map((i) => ({
        id: i.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
      }))
    );

    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (id, qty) => {
    if (qty < 1) return;
    await supabase.from("cart").update({ quantity: qty }).eq("id", id);
    fetchCart();
  };

  const removeItem = async (id) => {
    await supabase.from("cart").delete().eq("id", id);
    setCart((c) => c.filter((i) => i.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) return <p className="p-6">Loading cart…</p>;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-semibold">Your Cart</h1>

      <AnimatePresence>
        {cart.map((item) => (
          <motion.div key={item.id} className="mb-4 flex justify-between">
            <div>
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => updateQty(item.id, item.quantity - 1)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="mt-6 text-right font-semibold">
        Total: ₹{total}
      </div>
    </div>
  );
}
