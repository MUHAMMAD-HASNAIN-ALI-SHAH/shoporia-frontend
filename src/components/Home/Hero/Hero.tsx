import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center mt-28 select-none">
      <div className="w-full h-[60vh] flex items-center pt-10 px-4 md:px-10">
        <div className="w-full h-full flex gap-4">
          {/* Left side - Kids */}
          <div
            onClick={() => navigate("/products")}
            className="relative w-[70%] overflow-hidden rounded-2xl shadow-lg group"
          >
            <img
              src="/kids-hero.avif"
              alt="Kids"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute flex flex-col inset-0 bg-black/40 items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-500">
              <h2 className="text-white text-2xl md:text-3xl font-bold">
                Kids Fashion
              </h2>
              <p className="text-white text-lg md:text-xl mt-2">
                Explore our latest collection of kids' clothing, shoes, and
                accessories.
              </p>
            </div>
          </div>

          {/* Right side - Electronics + Mens */}
          <div
            onClick={() => navigate("/products")}
            className="w-[30%] grid grid-rows-2 gap-4"
          >
            {/* Electronics */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
              <img
                src="/electronics.avif"
                alt="Electronics"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                <h2 className="text-white text-xl md:text-2xl font-bold">
                  Electronics
                </h2>
              </div>
            </div>

            {/* Mens */}
            <div
              onClick={() => navigate("/products")}
              className="relative overflow-hidden rounded-2xl shadow-lg group"
            >
              <img
                src="/mens.avif"
                alt="Mens"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                <h2 className="text-white text-xl md:text-2xl font-bold">
                  Men's Fashion
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
