import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
  try {
    setLoading(true);
    const res = await api.get("/cart");
    setCart(res.data || []);
  } catch {
    setError("Unable to load cart");
  } finally {
    setLoading(false);
  }
};


  const updateQty = async (id, qty) => {
    if (qty < 1) return;
    await api.put(`/cart/${id}`, { quantity: qty });
    fetchCart();
  };

  const removeItem = async (id) => {
    await api.delete(`/cart/${id}`);
    setCart((c) => c.filter((i) => i.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) return <p className="p-6">Loading cart…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-semibold">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-neutral-500">Your cart is empty.</p>
      ) : (
        <>
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mb-4 flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-neutral-500">
                    ₹{item.price}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQty(item.id, item.quantity - 1)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQty(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="mt-6 text-right text-lg font-semibold">
            Total: ₹{total}
          </div>
        </>
      )}
    </div>
  );
}
