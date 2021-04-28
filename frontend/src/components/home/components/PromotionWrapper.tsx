import React, { FunctionComponent } from "react";
import PromotionCarousel from "./PromotionCarousel";

const PromotionBoxWrapper: FunctionComponent = () => {
  return (
    <div className="flex flex-col items-center p-20">
      <div className="text-3xl">Latest Promotions</div>
      <hr className="h-1 w-64 color-gold mt-4"></hr>
      <hr className="h-1 w-48 color-gold mt-2"></hr>
      <PromotionCarousel />
      <p className="text-right w-full">See more</p>
    </div>
  );
};

export default PromotionBoxWrapper;
