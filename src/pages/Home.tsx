import Footer from "@/components/Home/Footer/Footer";
import Hero from "@/components/Home/Hero/Hero";
import FeatureProducts from "@/components/Home/HomeComponents/FeatureProducts";
import Feature from "@/components/Home/HomeComponents/Features";
import Navbar from "@/components/Home/Navbar/Navbar";

const Home = () => {
  return (
    <div className="w-full">
      <Navbar />
      <Hero />
      <Feature />
      <FeatureProducts />
      <Footer />
    </div>
  );
};

export default Home;
