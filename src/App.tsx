import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import About from "./components/About/About";
import Faqs from "./components/Faqs/Faqs";
import Contact from "./components/Contact/Contact";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import ProductPage from "./pages/ProductPage";
import { useProductStore } from "./store/useProductStore";
import MyCart from "./pages/MyCart";
import { MyOrders } from "./pages/MyOrders";
import { Loader2 } from "lucide-react";
import Profile from "./pages/Profile";

function App() {
  const { verify, isAuthenticated, isAuthenticatedLoading, user } =
    useAuthStore();
  const { getAllProducts } = useProductStore();
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);
  useEffect(() => {
    verify();
  }, [verify]);

  if (isAuthenticatedLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated && user && user.role === "admin" ? (
              <Dashboard />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/my-cart"
          element={isAuthenticated && user ? <MyCart /> : <Navigate to={"/"} />}
        />
        <Route
          path="/my-orders"
          element={
            isAuthenticated && user ? <MyOrders /> : <Navigate to={"/"} />
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated && user ? <Profile /> : <Navigate to={"/"} />
          }
        />
        <Route
          path="/signin"
          element={!isAuthenticated ? <Signin /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route
          path="/forgot-password"
          element={
            !isAuthenticated ? <ForgotPassword /> : <Navigate to={"/"} />
          }
        />
        <Route
          path="/reset-password"
          element={!isAuthenticated ? <ResetPassword /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
