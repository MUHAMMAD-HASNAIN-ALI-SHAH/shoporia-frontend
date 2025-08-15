
import { useState } from "react";
import { motion } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const ProductCard = ({ product }: { product: any }) => {
  const {
    name,
    brand,
    category,
    price,
    image,
    isHotSale,
    description,
    rating,
    reviews,
  } = product;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className=""
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-contain bg-gray-100"
        />
        {isHotSale && <span className="badge">Hot Sale</span>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{brand}</span>
          <div className="flex items-center">
            <StarIcon className="h-4 w-4 text-yellow-400" />
            <span className="ml-1 text-sm text-gray-600">{rating}</span>
            <span className="ml-1 text-sm text-gray-400">({reviews})</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between pt-2">
          <span className="price-tag">${price}</span>
          <button className="btn btn-primary flex items-center space-x-2 bg-blue-800 hover:bg-blue-600 px-5 p-3 rounded-sm text-white cursor-pointer transition-all">
            <ShoppingCartIcon className="h-5 w-5" />
            <span>See Product</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
