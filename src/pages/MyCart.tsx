import Footer from "@/components/Home/Footer/Footer";
import Navbar from "@/components/Home/Navbar/Navbar";
import { useCartStore } from "@/store/useCartStore";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";

const MyCart = () => {
  const {
    orders,
    isLoading,
    fetchCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleCheckout = async () => {
    try {
      const res = await axiosInstance.post(
        "/api/v5/payment/create-checkout-session"
      );
      window.location.href = res.data.url;
    } catch (error) {
      toast.error("Failed to initiate checkout. Please try again later.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const totalPrice = orders.reduce(
    (acc, item) => acc + (item.product.price || 0) * item.quantity,
    0
  );

  return (
    <div className="w-full mt-28">
      <Navbar />
      <div className="max-w-[1200px] mx-auto py-24 px-4">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">My Cart</h2>

          {orders.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <>
              <div className="space-y-4">
                {orders.map((item) => (
                  <div
                    key={item._id} // orderId
                    className="flex items-center justify-between border p-2 rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          Array.isArray(item.product.images)
                            ? item.product.images[0]
                            : item.product.images
                        }
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-semibold">{item.product.name}</p>
                        <p className="text-gray-600">${item.product.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={(e) =>
                          updateQuantity(item._id!, parseInt(e.target.value))
                        }
                        className="w-16 border rounded px-2"
                      />
                      <button
                        onClick={() => removeFromCart(item._id!)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 border rounded-md bg-gray-50">
                <h3 className="text-lg font-semibold mb-2">Cart Summary</h3>
                <p className="text-gray-700 mb-2">
                  Total Items: {orders.length}
                </p>
                <p className="text-gray-700 mb-4">
                  Total Price: <span className="font-bold">${totalPrice}</span>
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={clearCart}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyCart;
