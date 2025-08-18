import { useState, useEffect } from "react";
import Navbar from "@/components/Home/Navbar/Navbar";
import Footer from "@/components/Home/Footer/Footer";
import { useProductStore, type Product } from "@/store/useProductStore";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(1000);
  const [ratings, setRatings] = useState<number[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);

  const { products } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const filtered = products.filter((p) => {
      const categoryMatch =
        categories.length === 0 || categories.includes(p.category);

      const priceMatch = p.price <= price;

      const ratingMatch =
        ratings.length === 0 || ratings.some((r) => p.ratingsAverage! >= r);

      const availabilityMatch =
        availability.length === 0 ||
        availability.includes(p.stock > 0 ? "in" : "out");

      return categoryMatch && priceMatch && ratingMatch && availabilityMatch;
    });

    setFilteredProducts(filtered);
  }, [products, categories, price, ratings, availability]);

  // Simple toggle handler for checkbox filters
  const toggleFilter = <T,>(
    value: T,
    setState: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    setState((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-[1200px] mx-auto py-36 px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-gray-600">
            Explore our wide range of products designed to meet your needs.
          </p>
        </div>

        <div className="flex gap-8 items-start">
          {/* Sidebar */}
          <aside className="w-1/5 bg-white p-5 shadow-md rounded-xl self-start">
            {/* Categories */}
            <div className="border-b pb-4 mb-4">
              <h2 className="text-lg font-semibold mb-3">Categories</h2>
              {[
                "Electronics",
                "Men Clothing",
                "Women Clothing",
                "Home and Kitchen",
                "Sports and Outdoors",
                "Books",
              ].map((cat) => (
                <label key={cat} className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    checked={categories.includes(cat)}
                    onChange={() => toggleFilter(cat, setCategories)}
                    className="accent-blue-600"
                  />
                  {cat}
                </label>
              ))}
            </div>

            {/* Price */}
            <div className="border-b pb-4 mb-4">
              <h2 className="text-lg font-semibold mb-3">Price Range</h2>
              <input
                type="range"
                min="0"
                max="1000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>$0</span>
                <span>${price}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="border-b pb-4 mb-4">
              <h2 className="text-lg font-semibold mb-3">Customer Rating</h2>
              {[4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    checked={ratings.includes(rating)}
                    onChange={() => toggleFilter(rating, setRatings)}
                    className="accent-blue-600"
                  />
                  {"⭐".repeat(rating)} & Up
                </label>
              ))}
            </div>

            {/* Availability */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Availability</h2>
              <label className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  checked={availability.includes("in")}
                  onChange={() => toggleFilter<string>("in", setAvailability)}
                  className="accent-blue-600"
                />
                In Stock
              </label>
              <label className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  checked={availability.includes("out")}
                  onChange={() => toggleFilter<string>("out", setAvailability)}
                  className="accent-blue-600"
                />
                Out of Stock
              </label>
            </div>
          </aside>

          {/* Product List */}
          <main
            className={`w-4/5 grid gap-6 ${
              filteredProducts.length < 3
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
            }`}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  onClick={() => navigate(`/products/${product._id}`)}
                  key={product._id}
                  className="bg-white cursor-pointer rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col h-full min-h-[350px] w-full"
                >
                  {product.images?.length > 0 && (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-72 object-cover rounded-md mb-3"
                    />
                  )}
                  <h3 className="text-lg font-semibold line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  <div className="mt-auto flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">
                      ${product.price}
                    </span>
                    <span className="text-yellow-500">
                      {"⭐".repeat(product.ratingsAverage || 0)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found.
              </p>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
