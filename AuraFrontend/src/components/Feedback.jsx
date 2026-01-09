import { motion } from "framer-motion";

const Feedback = () => {
  return (
    <motion.section
      className="feedback-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div className="feedback-left">
        <motion.h1
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
        >
          Give Us<br />Your<br />Precious<br />Feedback
        </motion.h1>
      </div>

      <motion.div
        className="feedback-form"
        initial={{ x: 30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
      >
        <form>
          <div className="form-row">
            <input placeholder="First Name" />
            <input placeholder="Surname" />
          </div>
          <div className="form-row">
            <input placeholder="Contact No." />
            <input placeholder="Email" />
          </div>
          <textarea rows="5" placeholder="Feedback"></textarea>
          <button className="shop-button button">Submit</button>
        </form>
      </motion.div>
    </motion.section>
  );
};

export default Feedback;
