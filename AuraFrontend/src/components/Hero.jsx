import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.div
      className="hero-box"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="hero-section">
        <motion.div
          className="p-8 text-3xl font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Aura frontend alive
        </motion.div>

        <motion.h1
          className="hero-heading outfit"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Elegant Sets Of Suits <br /> And Cordsets
        </motion.h1>

        <motion.button
          className="shop-button button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Shop Now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Hero;
