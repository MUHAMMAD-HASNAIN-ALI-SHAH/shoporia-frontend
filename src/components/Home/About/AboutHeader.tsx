
import { motion } from "framer-motion";

const AboutHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-4">About Shopnetic</h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Your trusted destination for quality products and exceptional shopping
        experiences
      </p>
    </motion.div>
  );
};

export default AboutHeader;
