import { motion } from "framer-motion";

import Hero from "../components/Hero";
import Products from "../components/Products";
import AboutUs from "../components/AboutUs";
import Feedback from "../components/Feedback";

export default function Home() {
  return (
    <>
      {/* Intro Section */}
      <section className="max-w-6xl mx-auto py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extralight tracking-tight mb-6">
            Simplicity,
            <br />
            intentionally.
          </h1>

          <p className="text-muted max-w-xl mx-auto mb-12 leading-relaxed">
            Aura is built on restraint. Every interaction has purpose. Nothing
            competes for attention.
          </p>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center justify-center rounded-full px-8 py-4 bg-fg text-bg text-sm font-medium"
          >
            Explore products
          </motion.button>
        </motion.div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-10">
          {["Clarity", "Balance", "Focus"].map((value) => (
            <motion.div
              key={value}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="border border-border rounded-2xl p-8"
            >
              <h3 className="text-xl font-light mb-3">{value}</h3>
              <p className="text-sm text-muted leading-relaxed">
                Designed with discipline. Free from excess. Calm by default.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Hero />
      <Products />
      <AboutUs />
      <Feedback />
    </>
  );
}
