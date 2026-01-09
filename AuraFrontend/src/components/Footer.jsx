import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="border-t border-border py-10 text-center text-sm text-muted"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      © {new Date().getFullYear()} Aura. Crafted with restraint.
    </motion.footer>
  );
};

export default Footer;
