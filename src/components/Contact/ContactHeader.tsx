
import { motion } from "framer-motion";

const ContactHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        We'd love to hear from you! Get in touch with our team through any of
        the channels below.
      </p>
    </motion.div>
  );
};

export default ContactHeader;
