import { ProductCarousel } from "./ProductCarsoul";

const Hero = () => {
  return (
    <div className="w-full flex justify-center bg-blue-800">
      <div className="w-full min-h-[50vh] md:min-h-screen flex items-center pt-10">
        <div className="w-full h-full">
        <ProductCarousel />
        </div>
      </div>
    </div>
  );
};

export default Hero;
