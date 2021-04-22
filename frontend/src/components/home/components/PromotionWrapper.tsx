import React, { FunctionComponent } from "react";

const PromotionBoxWrapper: FunctionComponent = () => {
  return (
    <div className="flex flex-col items-center p-20">
      <div className="text-3xl">Latest Promotions</div>
      <hr className="h-1 w-64 color-gold mt-4"></hr>
      <hr className="h-1 w-48 color-gold mt-2"></hr>
      <div className="h-64 w-2/3 bg-blue-400 mt-4">image</div>
      <p className="text-right w-full">See more</p>
    </div>
  );
};

export default PromotionBoxWrapper;
