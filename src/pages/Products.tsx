import { useState, useEffect } from "react";
import Navbar from "@/components/Home/Navbar/Navbar";
import { products as allProducts } from "@/data/products";

// Product type
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  inStock: boolean;
  image: string;
}

const Products = () => {
  // Filters state
  const [categories, setCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(1000);
  const [ratings, setRatings] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);

  // Filtered products
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(allProducts);

  // Apply filtering logic
  useEffect(() => {
    let filtered = [...allProducts];

    if (categories.length > 0) {
      filtered = filtered.filter((p) => categories.includes(p.category));
    }

    if (ratings.length > 0) {
      filtered = filtered.filter((p) =>
        ratings.some((r) => p.rating >= Number(r))
      );
    }

    if (availability.length > 0) {
      filtered = filtered.filter((p) =>
        availability.includes(p.inStock ? "in" : "out")
      );
    }

    filtered = filtered.filter((p) => p.price <= price);

    setFilteredProducts(filtered);
  }, [categories, price, ratings, availability]);

  // Handlers
  const toggleCategory = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleRating = (rating: string) => {
    setRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const toggleAvailability = (status: string) => {
    setAvailability((prev) =>
      prev.includes(status)
        ? prev.filter((a) => a !== status)
        : [...prev, status]
    );
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-[1200px] mx-auto py-24 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-gray-600">
            Explore our wide range of products designed to meet your needs.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-1/5 bg-white p-5 shadow-md rounded-xl h-fit">
            {/* Categories */}
            <div className="border-b pb-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Categories
              </h2>
              {["Electronics", "Clothing", "Home & Kitchen", "Sports"].map(
                (cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 py-1 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={categories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="accent-blue-600"
                    />
                    <span className="text-gray-700">{cat}</span>
                  </label>
                )
              )}
            </div>

            {/* Price */}
            <div className="border-b pb-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Price Range
              </h2>
              <input
                type="range"
                className="w-full accent-blue-600"
                min="0"
                max="1000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>$0</span>
                <span>${price}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="border-b pb-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Customer Rating
              </h2>
              {[4, 3, 2, 1].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center gap-2 py-1 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={ratings.includes(rating.toString())}
                    onChange={() => toggleRating(rating.toString())}
                    className="accent-blue-600"
                  />
                  <span>{"⭐".repeat(rating)} & Up</span>
                </label>
              ))}
            </div>

            {/* Availability */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Availability
              </h2>
              <label className="flex items-center gap-2 py-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availability.includes("in")}
                  onChange={() => toggleAvailability("in")}
                  className="accent-blue-600"
                />
                <span>In Stock</span>
              </label>
              <label className="flex items-center gap-2 py-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availability.includes("out")}
                  onChange={() => toggleAvailability("out")}
                  className="accent-blue-600"
                />
                <span>Out of Stock</span>
              </label>
            </div>
          </aside>

          {/* Products */}
          <main className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
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
                      {"⭐".repeat(product.rating)}
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
    </div>
  );
};

export default Products;
