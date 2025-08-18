import { useState } from "react";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/useAuthStore";
import { User, Menu, X, Search, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Faqs", path: "/faqs" },
    ...(user && user.role === "admin"
      ? [{ label: "Dashboard", path: "/dashboard" }]
      : []),
  ];

  return (
    <div className="fixed top-0 w-full shadow-sm bg-white z-50">
      {/* 🔹 Top Layer: Navigation Links + User + Cart */}
      <div className="w-full border-b bg-white">
        <nav className="flex justify-between items-center max-w-[1200px] mx-auto py-3 px-4">
          {/* Mobile Toggle */}
          <button
            className="md:hidden text-blue-500"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <li
                key={link.path}
                onClick={() => navigate(link.path)}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer transition-all"
              >
                {link.label}
              </li>
            ))}
          </ul>

          {/* Right Side: Cart + User/Login */}
          <div className="flex items-center gap-4">
            <ShoppingCart
              size={22}
              className="cursor-pointer text-gray-700 hover:text-blue-600"
              onClick={() => navigate("/my-cart")}
            />

            {isAuthenticated ? (
              <Menubar className="border-none bg-transparent">
                <MenubarMenu>
                  <MenubarTrigger className="bg-none">
                    <User className="text-gray-700 hover:text-blue-600 cursor-pointer" />
                  </MenubarTrigger>
                  <MenubarContent align="end">
                    <MenubarItem onClick={() => navigate("/profile")}>
                      Profile
                    </MenubarItem>
                    <MenubarItem onClick={() => navigate("/my-orders")}>
                      My Orders
                    </MenubarItem>
                    <MenubarItem onClick={logout}>Logout</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            ) : (
              <Button
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                onClick={() => navigate("/signin")}
              >
                Login
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white shadow-inner border-t px-4 py-3 space-y-3">
            {navLinks.map((link) => (
              <div
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setMobileOpen(false);
                }}
                className="text-md text-black/90 hover:text-blue-500 cursor-pointer transition-all"
              >
                {link.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔹 Bottom Layer: Logo + Search Bar */}
      <div className="w-full bg-blue-500 text-white py-4 px-4">
        <div className="flex justify-between items-center max-w-[1200px] mx-auto">
          {/* Logo */}
          <h1
            className="font-bold text-2xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            Shoporia
          </h1>

          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-full overflow-hidden w-1/2 shadow-sm">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 text-black outline-none"
            />
            <button className="px-4 py- hover:cursor-pointer transition-colors">
              <Search className="text-black" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
