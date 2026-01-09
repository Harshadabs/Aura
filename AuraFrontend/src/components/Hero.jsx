import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="hero-box">
      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <motion.div
          className="p-8 text-3xl font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >

        </motion.div>

        <motion.h1
          className="hero-heading outfit"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Elegant Sets Of Suits <br /> And Cordsets
        </motion.h1>

        <motion.button
          className="shop-button button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2 }}
        >
          Shop Now
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
