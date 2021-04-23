import React, { FunctionComponent } from "react";
import { IItem } from "../../commons/type/ICart";

interface ItemProps {
  items: IItem[];
}

const CartTable: FunctionComponent<ItemProps> = ({ items }: ItemProps) => {
  return (
    <div className="px-20 pt-20">
      <div className="text-2xl">Your Cart</div>
      <table className="table-auto w-full mt-10">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item: IItem, index: number) => (
            <tr>
              <td className="text-center">{index + 1}</td>
              <td>
                {item.brand} | {item.name}
                {item.promotion && (
                  <div className="text-xs m-1 bg-gold-300 rounded-full p-2 text-center">
                    {item?.promotion?.type === "ลดราคา" && (
                      <p>
                        {item?.promotion?.type} {item.promotion?.discount} บาท
                      </p>
                    )}
                    {item?.promotion?.type === "1 แถม 1" && (
                      <p>
                        {item?.promotion?.type} คุณได้รับสินค้าเพิ่มขึ้นอีก {item.promotion?.amount}{" "}
                        ชิ้น
                      </p>
                    )}
                  </div>
                )}
              </td>
              <td className="text-right">{item.amount}</td>
              <td className="text-right">{item.amount * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
