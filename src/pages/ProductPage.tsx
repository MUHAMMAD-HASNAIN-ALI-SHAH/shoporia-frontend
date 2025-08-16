import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "@/lib/axios";
import { useProductStore, type Product } from "@/store/useProductStore";
import Navbar from "@/components/Home/Navbar/Navbar";
import Footer from "@/components/Home/Footer/Footer";
import { useCartStore } from "@/store/useCartStore";

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products } = useProductStore();
  const { addToCart, addToCartLoader } = useCartStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axiosInstance.get(
          `/api/v3/product/${productId}`
        );
        setProduct(response.data);
        if (response.data.images?.length > 0) {
          setSelectedImage(response.data.images[0]);
        }
      } catch (err: any) {
        console.error("Error fetching product:", err);
        if (err.response?.status === 400) {
          setError("Invalid product ID format.");
        } else if (err.response?.status === 404) {
          setError("Product not found.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

  // Fetch similar products
  useEffect(() => {
    if (product) {
      const related = products.filter(
        (p) => p.category === product.category && p._id !== product._id
      );
      setSimilarProducts(related.slice(0, 4));
    }
  }, [product, products]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-gray-600" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-red-500 text-lg font-medium">{error}</p>
      </div>
    );
  }

  // Empty product
  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-600 text-lg">No product to display</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Navbar />
      <div className="min-h-screen max-w-6xl mx-auto flex flex-col items-start px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-20 w-full rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-sm"
        >
          {/* Image Section */}
          <div>
            <div className="border rounded-xl overflow-hidden mb-4 bg-gray-50">
              <img
                src={selectedImage || "/placeholder.png"}
                alt={product.name}
                className="w-full h-[400px] object-contain"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`border rounded-lg overflow-hidden w-20 h-20 flex-shrink-0 transition ${
                    selectedImage === img ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt={`thumbnail-${idx}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <p className="text-3xl font-semibold text-blue-600 mb-4">
              ${product.price}
            </p>

            {/* Ratings */}
            <div className="flex items-center mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(product.ratingsAverage || 0)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-500">
                ({product.ratingsCount || 0} reviews)
              </span>
            </div>

            {/* Stock */}
            <p
              className={`mb-6 font-medium ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>

            {/* Action Button */}
            <motion.button
              onClick={() => addToCart(product._id!, 1)}
              whileTap={{ scale: 0.95 }}
              disabled={product.stock === 0 || addToCartLoader}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                product.stock > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              {addToCartLoader && (
                <Loader2 className="inline-block mr-2 animate-spin h-5 w-5" />
              )}
              {product.stock > 0 ? "Add to Cart" : "Unavailable"}
            </motion.button>
          </div>
        </motion.div>

        {/* Similar Products */}
        <div className="w-full mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/products/${item._id}`)}
                className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer p-4 flex flex-col"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {item.description}
                </p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-600">
                    ${item.price}
                  </span>
                  <span className="text-yellow-500">
                    {"⭐".repeat(Math.round(item.ratingsAverage || 0))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
