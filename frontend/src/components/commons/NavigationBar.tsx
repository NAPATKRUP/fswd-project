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
          if (n === 'HOME') {
            return (
              <NavLink to="/" key={n} className="hover:text-gold-200">
                HOME
              </NavLink>
            );
          } else if (n === 'PRODUCTS') {
            return (
              <NavLink to="/products" key={n} className="hover:text-gold-200">
                PRODUCTS
              </NavLink>
            );
          } else if (n === 'PROMOTIONS') {
            return (
              <NavLink to="/promotions" key={n} className="hover:text-gold-200">
                PROMOTIONS
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
