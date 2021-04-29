import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useQuery } from "@apollo/client";
import { PROMOTION_QUERY } from "../graphql/promotionByMany";
import Loading from "../../commons/loading/Loading";
import { IPromotion } from "../../commons/type/IPromotion";
import moment from "moment";
import "moment/locale/th";

interface PromotionProps {
  promotions: IPromotion;
}

const PromotionCarousel: any = () => {
  const { loading, error, data } = useQuery(PROMOTION_QUERY);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return "Error !!";
  }

  const { promotionByMany } = data;

  return (
    <OwlCarousel className="owl-theme" margin={10}>
      {promotionByMany.map((item: IPromotion) => {
        const startDateLabel = moment(new Date(item.startDate)).format("LL");
        const endDateLabel = moment(item.endDate).format("LL");
        return (
          <div className="item" key={item.slug} style={{ textAlign: "center" }}>
            <img src={item.image} />
            <p>{item.name}</p>
            <p>ตั้งแต่วันที่ : {startDateLabel}</p>
            <p>ถึงวันที่ : {endDateLabel}</p>
          </div>
        );
      })}
    </OwlCarousel>
  );
};

export default PromotionCarousel;
