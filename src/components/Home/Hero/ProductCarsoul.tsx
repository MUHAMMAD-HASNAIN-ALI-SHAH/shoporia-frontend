import {
  Carousel as UiCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ExclusiveDeals from "./ExclusiveDeals";
import JoinShopnetic from "./JoinShopnetic";
import TrustedByThousands from "./TrustedByThousands";
import WelcomeToShopnetic from "./WelcomeToShopnetic";
import StartSelling from "./StartSelling";

const CarouselComponents = [
  WelcomeToShopnetic,
  ExclusiveDeals,
  JoinShopnetic,
  TrustedByThousands,
  StartSelling,
];

export function ProductCarousel() {
  return (
    <UiCarousel className="w-full h-[50vh] md:h-full flex justify-left items-center">
      <CarouselContent className="w-full h-full">
        {CarouselComponents.map((Component, index) => (
          <CarouselItem
            key={index}
            className="w-full h-full flex flex-col justify-center items-center"
          >
            <Component />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-[15px]" />
      <CarouselNext className="right-[15px]" />
    </UiCarousel>
  );
}
