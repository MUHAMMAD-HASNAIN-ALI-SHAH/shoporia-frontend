import ContactTeam from "./ContactTeam";
import ContactLinks from "./ContactLinks";
import ContactHeader from "./ContactHeader";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";

const Contact = () => {
  return (
    <div className="w-full mt-24">
      <Navbar />
      <div className="py-24 pb-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactHeader />

          {/* Social Media Links */}
          <ContactLinks />

          {/* Team Members */}
          <ContactTeam />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
