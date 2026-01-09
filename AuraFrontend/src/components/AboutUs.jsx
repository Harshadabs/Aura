import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="herobox">
      <motion.div
        className="hero-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="about-heading"
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h2>

        <span className="about-content">
          <motion.h1
            className="about-text outfit"
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Rooted in friendship and bound by a shared creative vision...
          </motion.h1>

          <motion.img
            src="src/assets/about us.png"
            className="aboutimg"
            alt="About Us"
            initial={{ scale: 0.96, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </span>
      </motion.div>
    </section>
  );
};

export default AboutUs;
