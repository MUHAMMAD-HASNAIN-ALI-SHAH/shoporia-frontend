
import { motion } from "framer-motion";

const OurMission = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
      <p className="text-gray-600 mb-4">
        At Shopnetic, our mission is to make online shopping simple, enjoyable,
        and accessible to everyone. We strive to:
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Provide high-quality products at competitive prices</li>
        <li>Deliver exceptional customer service</li>
        <li>Ensure a seamless shopping experience</li>
        <li>Build long-lasting relationships with our customers</li>
      </ul>
    </motion.div>
  );
};

export default OurMission;
