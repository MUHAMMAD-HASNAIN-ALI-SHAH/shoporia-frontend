
import { motion } from "framer-motion";

const OurStory = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
      <p className="text-gray-600 mb-4">
        Founded in 2025, Shopnetic started as a small online store with a big
        vision: to provide customers with high-quality products at competitive
        prices while delivering an exceptional shopping experience.
      </p>
      <p className="text-gray-600">
        Today, we've grown into a trusted e-commerce platform serving customers
        worldwide, offering a wide range of products from fashion and
        electronics to home goods and accessories.
      </p>
    </motion.div>
  );
};

export default OurStory;
