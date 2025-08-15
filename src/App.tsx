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

function App() {
  const { verify, isAuthenticated } = useAuthStore();
  useEffect(() => {
    verify();
  }, [verify]);
  return (
    <div className="w-full bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<Faqs />} />
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
