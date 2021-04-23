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
              <td className="">
                {item.brand} | {item.name}{" "}
                <div className="text-xs m-1 bg-gold-300 rounded-full w-20 text-center">
                  {item.promotion?.type} {item.promotion?.amount} {item.promotion?.discount}
                </div>
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
