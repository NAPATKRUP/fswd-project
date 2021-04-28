import React, { FC, Fragment } from "react";
import { IPromotion } from "../../commons/type/IPromotion";
import moment from "moment";
import "moment/locale/th";

interface PromotionProps {
  promotions: IPromotion[];
}

const PromotionCard: FC<PromotionProps> = ({ promotions }: PromotionProps) => {
  console.log(promotions);

  return (
    <div className="grid grid-cols-3 gap-4 py-1">
      {promotions?.map((e, index) => {
        const startDateLabel = moment(new Date(e.startDate)).format("LL");
        const endDateLabel = moment(e.endDate).format("LL");
        return (
          <div
            key={index}
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 12,
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              height: "auto",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <span style={{ fontSize: 30, display: "flex", justifyContent: "center" }}>
              <b>{e.name}</b>
            </span>
            <img
              src={e.image}
              style={{
                height: 300,
                marginTop: 20,
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />

            <span style={{ display: "flex", justifyContent: "center" }}>
              รายละเอียด : {e.description}
            </span>
            <span>
              เริ่มตั้งแต่วันที่ {startDateLabel} จนถึง {endDateLabel} นี้ ด่วนเลย
            </span>
            <span>
              สินค้าที่ร่วมรายการ :{" "}
              {e?.products.map((e, index) => {
                return (
                  <p>
                    {e.brand} || {e.name}
                  </p>
                );
              })}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default PromotionCard;
