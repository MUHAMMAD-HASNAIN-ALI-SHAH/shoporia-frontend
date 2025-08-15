import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export default function FaqsAccordion() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0 }}
      className="w-full h-full "
    >
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" className="bg-gray-200 px-5">
          <AccordionTrigger>Product Information</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Shopinetic offers a wide range of high-quality products from
              top-rated vendors. Every item is curated to meet high standards of
              performance and durability.
            </p>
            <p>
              Each product listing includes detailed specifications, user
              reviews, and seller information to help you make informed buying
              decisions.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="bg-gray-200 px-5">
          <AccordionTrigger>Shipping Details</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Shopinetic provides nationwide and international shipping through
              trusted logistics partners. Standard shipping takes 3-5 business
              days, while express delivery is available within 1-2 business
              days.
            </p>
            <p>
              Admins can manage shipping providers and zones via the admin
              panel, while users can track their orders in real-time from their
              dashboard.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="bg-gray-200 px-5">
          <AccordionTrigger>Return Policy</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              At Shopinetic, customer satisfaction is our priority. Users can
              return eligible items within 30 days of delivery through a simple
              online process.
            </p>
            <p>
              Admins can monitor return requests and initiate refunds directly
              from the admin dashboard. Refunds are processed within 48 hours
              after the returned item is received and inspected.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}
