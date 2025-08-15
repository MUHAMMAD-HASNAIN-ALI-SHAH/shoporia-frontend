import React from "react";
import FaqsHeader from "./FaqsHeader";
import FaqsAccordion from "./FaqsAccordion";

const Faqs = () => {
  return (
    <div className="py-24 pb-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaqsHeader />
        <FaqsAccordion />
      </div>
    </div>
  );
};

export default Faqs;
