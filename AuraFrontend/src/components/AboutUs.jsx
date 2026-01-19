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
            Rooted in friendship and bound by a shared creative vision, our journey began when three individuals each with a unique eye for design and a deep love for tradition came together with one goal to create a brand that reimagines ethnic wear for the modern world.
            <br></br><br></br>
            We started with a simple belief that tradition doesn’t have to be old fashioned, and timeless style can still be refreshingly new. Drawing from our cultural heritage, personal experiences, and a mutual passion for textiles, we built a brand that reflects both who we are and what we stand for.
            <br></br><br></br>
            Every piece we create blends craftsmanship with comfort, elegance with ease. From everyday classics to statement festive ensembles, our designs honor traditional silhouettes while embracing contemporary detail and versatility.
            <br></br><br></br>
            More than just a clothing label, our brand is a reflection of friendship, authenticity, and artistry. Each collection is thoughtfully designed keeping in mind the woman who values heritage but lives in the present.
            <br></br><br></br>
            This is our story. Three friends. One dream. A shared love for ethnic fashion. And a commitment to creating clothing that celebrates every woman’s individuality and roots.
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
