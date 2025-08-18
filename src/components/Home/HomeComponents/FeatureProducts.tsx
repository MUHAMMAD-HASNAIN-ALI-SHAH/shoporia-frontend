import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import { useProductStore } from "@/store/useProductStore";

const FeatureProducts = () => {
  const { products } = useProductStore();

  return (
    <div className="w-full flex flex-col justify-center items-center bg-gray-5 py-5">
      <h1 className="text-center font-bold text-3xl">Features Products</h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl"
      >
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="my-3">
            {products.map((feature, index) => (
              <CarouselItem
                key={index}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 w-full"
              >
                <div className="p-4">
                  <div className="max-w-sm sm:w-full mx-auto">
                    <ProductCard product={feature} />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="top-0 left-[15px]" />
          <CarouselNext className="top-0 right-[15px]" />
        </Carousel>
      </motion.div>
    </div>
  );
};

export default FeatureProducts;
