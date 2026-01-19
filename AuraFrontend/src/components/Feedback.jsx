import { motion } from "framer-motion";

const Feedback = () => {
  return (
    <section className="feedback-wrapper">
    <div className="feedback-section">
      <motion.div
        className="feedback-left"
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="feedback-text">
          Give Us<br />Your<br />Precious<br />Feedback
        </h1>
      </motion.div>

      <motion.div
        className="feedback-form"
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
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
      </div>
    </section>
  );
};

export default Feedback;
