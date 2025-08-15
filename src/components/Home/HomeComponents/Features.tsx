

import * as React from "react";
import {
  TruckIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  CreditCardIcon,
  SparklesIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const features = [
  {
    icon: <TruckIcon className="h-12 w-12 text-blue-600" />,
    title: "Free Shipping",
    description: "Free shipping on all orders over $50",
  },
  {
    icon: <ShieldCheckIcon className="h-12 w-12 text-blue-600" />,
    title: "Quality Guarantee",
    description: "30-day money-back guarantee on all products",
  },
  {
    icon: <LockClosedIcon className="h-12 w-12 text-blue-600" />,
    title: "Secure Payment",
    description: "Your payment information is encrypted and secure",
  },
  {
    icon: <CreditCardIcon className="h-12 w-12 text-blue-600" />,
    title: "Easy Checkout",
    description: "Fast and easy checkout with multiple payment options",
  },
  {
    icon: <SparklesIcon className="h-12 w-12 text-blue-600" />,
    title: "Exclusive Offers",
    description: "Members get early access to deals and products",
  },
  {
    icon: <GiftIcon className="h-12 w-12 text-blue-600" />,
    title: "Gift Packaging",
    description: "Beautiful gift wrapping options available",
  },
];

export default function Feature() {
  return (
    <div className="w-full flex justify-center bg-gray-50 py-10">
      <div className="w-full max-w-6xl">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="my-3">
            {features.map((feature, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-64 flex items-center justify-center">
                      <CardContent className="flex flex-col items-center text-center justify-center gap-4 h-full">
                        {feature.icon}
                        <h3 className="text-lg font-semibold">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="top-0 left-[15px]" />
          <CarouselNext className="top-0 right-[15px]" />
        </Carousel>
      </div>
    </div>
  );
}
