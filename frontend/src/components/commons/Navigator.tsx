import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface NavigatorProp {
  listOfNode: string[];
}

const Navigator: FC<NavigatorProp> = ({ listOfNode }: NavigatorProp) => {
  return (
    <div className="font-semibold lg:ml-20 md:ml-10 mt-4 flex">
      {listOfNode.map((n, index) => {
        if (index !== listOfNode.length - 1) {
          if (n === '>>') {
            return (
              <p className="mx-2" key={index + n}>
                {' >> '}
              </p>
            );
          } else {
            if (n === 'หน้าหลัก') {
              return (
                <NavLink to="/" key={n} className="hover:text-gold-200">
                  หน้าหลัก
                </NavLink>
              );
            } else if (n === 'สินค้า') {
              return (
                <NavLink to="/products" key={n} className="hover:text-gold-200">
                  สินค้า
                </NavLink>
              );
            } else if (n === 'โปรโมชั่น') {
              return (
                <NavLink to="/promotions" key={n} className="hover:text-gold-200">
                  โปรโมชั่น
                </NavLink>
              );
            } else if (n === 'บัญชีของฉัน') {
              return (
                <NavLink to="/customer" key={n} className="hover:text-gold-200">
                  บัญชีของฉัน
                </NavLink>
              );
            } else if (n === 'คำสั่งซื้อ') {
              return (
                <NavLink to="/customer/orders" key={n} className="hover:text-gold-200">
                  คำสั่งซื้อ
                </NavLink>
              );
            } else if (n === 'จัดการ') {
              return (
                <NavLink to="/admin" key={n} className="hover:text-gold-200">
                  จัดการ
                </NavLink>
              );
            } else if (n === 'จัดการสินค้า') {
              return (
                <NavLink to="/admin/product" key={n} className="hover:text-gold-200">
                  จัดการสินค้า
                </NavLink>
              );
            } else if (n === 'จัดการโปรโมชั่น') {
              return (
                <NavLink to="/admin/promotions" key={n} className="hover:text-gold-200">
                  จัดการโปรโมชั่น
                </NavLink>
              );
            } else if (n === 'จัดการออเดอร์') {
              return (
                <NavLink to="/admin/orders" key={n} className="hover:text-gold-200">
                  จัดการออเดอร์
                </NavLink>
              );
            } else {
              return <p key={n}>{n.toUpperCase()}</p>;
            }
          }
        } else {
          return (
            <p key={n} className="text-gold-100">
              {n.toUpperCase()}
            </p>
          );
        }
      })}
    </div>
  );
};

export default Navigator;
