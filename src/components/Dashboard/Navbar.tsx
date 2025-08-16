import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "../ui/sidebar";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-16 bg-gray-100 flex items-center justify-center shadow-md relative">
      <SidebarTrigger className="absolute left-0" />
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-black select-none cursor-pointer"
      >
        Shoporia
      </h1>
      <div className="absolute right-10"></div>
    </div>
  );
};

export default Navbar;
