
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { PhoneIcon } from "lucide-react";

const ContactTeam = () => {
  const teamMembers = [
    {
      name: "Muhammad Hasnain ALi Shah",
      role: "CEO & Founder",
      email: "hasnain@gmail.com",
      phone: "+1 (555) 123-4567",
    },
    {
      name: "Muhammad Hasnain ALi Shah",
      role: "Customer Support",
      email: "hasnain@gmail.com",
      phone: "+1 (555) 987-6543",
    },
    {
      name: "Muhammad Hasnain ALi Shah",
      role: "Technical Support",
      email: "hasnain@gmail.com",
      phone: "+1 (555) 456-7890",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {teamMembers.map((member, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {member.name}
          </h3>
          <p className="text-gray-600 mb-4">{member.role}</p>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <EnvelopeIcon className="h-5 w-5 mr-2" />
              <a
                href={`mailto:${member.email}`}
                className="hover:text-blue-600 transition-colors"
              >
                {member.email}
              </a>
            </div>
            <div className="flex items-center text-gray-600">
              <PhoneIcon className="h-5 w-5 mr-2" />
              <a
                href={`tel:${member.phone}`}
                className="hover:text-blue-600 transition-colors"
              >
                {member.phone}
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ContactTeam;
