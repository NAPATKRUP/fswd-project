import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface NavigationBarProp {
  listOfNode: string[];
}

const NavigationBar: FC<NavigationBarProp> = ({ listOfNode }: NavigationBarProp) => {
  return (
    <div className="flex text-md">
      {listOfNode.map((n, index) => {
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
          } else {
            return <p key={n}>{n.toUpperCase()}</p>;
          }
        }
      })}
    </div>
  );
};

export default NavigationBar;
