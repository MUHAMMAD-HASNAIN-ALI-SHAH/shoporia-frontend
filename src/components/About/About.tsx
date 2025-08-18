import AboutValues from "./OurValues";
import OurMission from "./OurMission";
import OurStory from "./OurStory";
import AboutHeader from "./AboutHeader";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";

const About = () => {
  return (
    <div className="w-full mt-24">
      <Navbar />
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutHeader />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <OurStory />

            <OurMission />
          </div>

          <AboutValues />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
