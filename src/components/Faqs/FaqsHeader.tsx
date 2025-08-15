import { motion } from "framer-motion";

const FaqsHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-4">FAQs</h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Got questions about Shopinetic? Find answers about orders, shipping, returns,
        and how to manage your store — whether you're a customer or an admin.
      </p>
    </motion.div>
  );
};

export default FaqsHeader;
