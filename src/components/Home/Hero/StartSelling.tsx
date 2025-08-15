import { motion } from "framer-motion";

const StartSelling = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white font-bold text-2xl md:text-5xl text-center"
      >
        Become a Seller
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-white text-md md:text-xl"
      >
        Set up your store in minutes on Shopnetic
      </motion.h2>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-blue-500 px-1 py-1 md:px-4 md:py-3 bg-white w-[150px] rounded-xl cursor-pointer"
      >
        Start Selling
      </motion.button>
    </div>
  );
};

export default StartSelling;
