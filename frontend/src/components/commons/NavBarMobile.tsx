import { FC, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useSession } from '../../context/SessionContext';

import { LoginIcon, LogoutIcon } from '@heroicons/react/outline';
import {
  HomeIcon,
  CollectionIcon,
  TagIcon,
  ShoppingCartIcon,
  CogIcon,
  UserIcon,
  UserAddIcon,
} from '@heroicons/react/solid';

const NavbarMobile: FC = () => {
  const { user, logout } = useSession();

  const handleOnClick = useCallback(() => {
    const handleLogout = async () => {
      await logout();
    };
    handleLogout();
  }, [logout]);

  return (
    <div className="grid grid-cols-12 text-sm text-white-100 w-full bg-dark-100 md:hidden mt-4 mb-8">
      <p className="col-span-3 font-semibold text-gold-100 mx-4 px-2 py-3">
        PERFUME <span className="text-xs">HOUSE</span>
      </p>
      <div className="col-span-6 flex justify-around items-center">
        <NavLink exact to={`/`} activeClassName="text-gold-200">
          <HomeIcon className="h-5 w-5" />
        </NavLink>
        <NavLink to={`/products`} activeClassName="text-gold-200">
          <CollectionIcon className="h-5 w-5" />
        </NavLink>
        <NavLink to={`/promotions`} activeClassName="text-gold-200">
          <TagIcon className="h-5 w-5" />
        </NavLink>
        {(user?.role === 'customer' || user?.role === 'admin') && (
          <NavLink to={`/cart`} activeClassName="text-gold-200">
            <ShoppingCartIcon className="h-5 w-5" />
          </NavLink>
        )}
        {user?.role === 'admin' && (
          <NavLink to={`/admin`} activeClassName="text-gold-200">
            <CogIcon className="h-5 w-5" />
          </NavLink>
        )}
      </div>
      <div className="col-span-3 flex justify-around items-center">
        {!user && (
          <>
            <NavLink exact to={`/login`} activeClassName="text-gold-200">
              <LoginIcon className="h-5 w-5" />
            </NavLink>
            <NavLink exact to={`/register`} activeClassName="text-gold-200">
              <UserAddIcon className="h-5 w-5" />
            </NavLink>
          </>
        )}
        {user && (
          <>
            <NavLink to={`/customer`} activeClassName="text-gold-200">
              <UserIcon className="h-5 w-5" />
            </NavLink>
            <div role="button" className="text-gold-200" onClick={handleOnClick}>
              <LogoutIcon className="h-5 w-5" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarMobile;
