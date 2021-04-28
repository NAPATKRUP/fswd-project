import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface NavigatorProp {
  listOfNode: string[];
}

const Navigator: FC<NavigatorProp> = ({ listOfNode }: NavigatorProp) => {
  return (
    <div className="font-semibold ml-8 mt-4 flex">
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
