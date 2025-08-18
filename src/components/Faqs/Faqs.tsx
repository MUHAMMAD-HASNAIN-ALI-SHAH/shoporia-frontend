import FaqsHeader from "./FaqsHeader";
import FaqsAccordion from "./FaqsAccordion";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";

const Faqs = () => {
  return (
    <div className="w-full mt-24">
      <Navbar />
      <div className="py-24 pb-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqsHeader />
          <FaqsAccordion />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Faqs;
