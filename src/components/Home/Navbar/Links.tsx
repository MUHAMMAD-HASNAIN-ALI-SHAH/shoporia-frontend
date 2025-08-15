import { useNavigate } from "react-router-dom";

const Links = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-5">
      <h1
        className="font-bold text-2xl hover:cursor-pointer text-blue-500"
        onClick={() => navigate("/")}
      >
        Shopinetic
      </h1>
      <ul className="flex gap-5">
        <li
          onClick={() => navigate("/")}
          className="text-md text-black/90 hover:text-blue-400 hover:cursor-pointer transition-all"
        >
          Home
        </li>
        <li
          onClick={() => navigate("/products")}
          className="text-md text-black/90 hover:text-blue-400 hover:cursor-pointer transition-all"
        >
          Products
        </li>
        <li
          onClick={() => navigate("/about")}
          className="text-md text-black/90 hover:text-blue-400 hover:cursor-pointer transition-all"
        >
          About
        </li>
        <li
          onClick={() => navigate("/contact")}
          className="text-md text-black/90 hover:text-blue-400 hover:cursor-pointer transition-all"
        >
          Contact
        </li>
        <li
          onClick={() => navigate("/faqs")}
          className="text-md text-black/90 hover:text-blue-400 hover:cursor-pointer transition-all"
        >
          Faqs
        </li>
      </ul>
    </div>
  );
};

export default Links;
