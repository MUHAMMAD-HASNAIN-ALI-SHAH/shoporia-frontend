
import { motion } from "framer-motion";

const ContactLinks = () => {
  const socialLinks = [
    {
      name: "Email",
      icon: "📧",
      url: "mailto:contact@a.com",
      color: "hover:bg-red-100",
    },
    {
      name: "Facebook",
      icon: "📘",
      url: "",
      color: "hover:bg-blue-100",
    },
    {
      name: "Instagram",
      icon: "📸",
      url: "",
      color: "hover:bg-pink-100",
    },
    {
      name: "LinkedIn",
      icon: "💼",
      url: "",
      color: "hover:bg-blue-100",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
    >
      {socialLinks.map((link, index) => (
        <motion.a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex flex-col items-center justify-center p-6 rounded-lg bg-white shadow-md ${link.color} transition-colors`}
        >
          <span className="text-4xl mb-2">{link.icon}</span>
          <span className="text-gray-900 font-medium">{link.name}</span>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default ContactLinks;
