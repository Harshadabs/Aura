import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <motion.section
      className="herobox"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="hero-section">
        <motion.h2
          className="about-heading"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
        >
          About Us
        </motion.h2>

        <span className="about-content">
          <motion.h1
            className="about-text outfit"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Rooted in friendship and bound by a shared creative vision...
          </motion.h1>

          <motion.img
            src="src/assets/about us.png"
            className="aboutimg"
            alt="About Us"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
          />
        </span>
      </div>
    </motion.section>
  );
};

export default AboutUs;
