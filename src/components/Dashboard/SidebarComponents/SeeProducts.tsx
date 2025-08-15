import { ShoppingCart } from "lucide-react";

const products = [
  {
    name: "Wireless Headphones",
    description: "Noise-cancelling over-ear headphones",
    price: 99.99,
    category: "electronics",
    stock: 25,
    status: "active",
    hotSale: true,
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Men's T-Shirt",
    description: "100% cotton casual t-shirt",
    price: 19.99,
    category: "men",
    stock: 100,
    status: "active",
    hotSale: true,
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Book - React Essentials",
    description: "A beginner's guide to building apps with React",
    price: 29.99,
    category: "books",
    stock: 50,
    status: "inactive",
    hotSale: false,
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=400&q=80",
  },
];

const SeeProducts = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">See Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="border rounded-lg shadow hover:shadow-lg transition-shadow p-4 space-y-3 group
                       w-full max-w-sm
                       h-[400px] flex flex-col"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-md bg-gray-100 flex items-center justify-center h-40 flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                width={256}
                height={256}
                className="object-contain h-full w-full"
              />
              {product.hotSale && (
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  Hot Sale
                </span>
              )}
            </div>

            {/* Content */}
            <div className="space-y-1 flex-grow overflow-hidden">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {product.description}
              </p>
              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>
              <p className="text-sm text-gray-500">
                Stock: {product.stock} | Status: {product.status}
              </p>
            </div>

            {/* Footer: price and button */}
            <div className="flex items-center justify-between pt-2 flex-shrink-0">
              <span className="text-lg font-bold text-gray-900">
                ${product.price}
              </span>
              <button className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-600 px-4 py-2 rounded text-white text-sm transition-all">
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeProducts;
