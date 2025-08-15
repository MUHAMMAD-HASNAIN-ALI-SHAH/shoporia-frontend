
import { motion } from "framer-motion";

const OurValues = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="mt-16 bg-blue-50 p-8 rounded-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality</h3>
          <p className="text-gray-600">
            We carefully select our products to ensure they meet our high
            standards of quality and durability.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Customer Focus
          </h3>
          <p className="text-gray-600">
            Our customers are at the heart of everything we do. We listen to
            their needs and continuously improve our services.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Innovation
          </h3>
          <p className="text-gray-600">
            We embrace new technologies and ideas to enhance the shopping
            experience and stay ahead of the curve.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OurValues;
