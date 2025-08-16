import { useState } from "react";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/useAuthStore";
import { User, Menu, X } from "lucide-react";
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
    <div className="fixed top-0 w-full flex flex-col shadow-sm bg-white z-50">
      {/* Navbar Row */}
      <nav className="flex justify-between items-center w-full max-w-[1200px] mx-auto py-4 px-4">
        {/* Menu Button for Mobile */}
        <button
          className="md:hidden text-blue-500"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Logo */}
        <h1
          className="font-bold text-2xl text-blue-500 hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          Shoporia
        </h1>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-5">
          {navLinks.map((link) => (
            <li
              key={link.path}
              onClick={() => navigate(link.path)}
              className="text-md text-black/90 hover:text-blue-400 hover:cursor-pointer transition-all"
            >
              {link.label}
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-5 text-lg text-black/90">
          {isAuthenticated ? (
            <Menubar className="border-none">
              <MenubarMenu>
                <MenubarTrigger className="bg-none">
                  <User className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                </MenubarTrigger>
                <MenubarContent className="mr-5 md:mr-28">
                  <MenubarItem onClick={() => navigate("/profile")}>
                    Profile
                  </MenubarItem>
                  <MenubarItem onClick={() => navigate("/my-cart")}>
                    My Cart
                  </MenubarItem>
                  <MenubarItem onClick={logout}>Logout</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ) : (
            <Button
              variant="outline"
              className="text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
              onClick={() => navigate("/signin")}
            >
              Login
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile Menu Links */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-inner border-t px-4 py-3 space-y-3">
          {navLinks.map((link) => (
            <div
              key={link.path}
              onClick={() => {
                navigate(link.path);
                setMobileOpen(false);
              }}
              className="text-md text-black/90 hover:text-blue-400 cursor-pointer transition-all"
            >
              {link.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
