import { FC, useCallback, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useSession } from '../../context/SessionContext';

const Navbar: FC = () => {
  const { loading, user, logout } = useSession();

  const handleOnClick = useCallback(() => {
    const handleLogout = async () => {
      await logout();
    };
    handleLogout();
  }, [logout]);

  const userBox = useMemo(() => {
    if (loading) return <div></div>;

    if (!user)
      return (
        <>
          <li className="lg:p-5 p-2">
            <NavLink exact to={`/login`} activeClassName="text-gold-200">
              Login
            </NavLink>
          </li>
          <li className="lg:p-5 p-2">
            <NavLink exact to={`/register`} activeClassName="text-gold-200">
              Register
            </NavLink>
          </li>
        </>
      );

    if (user)
      return (
        <>
          <li className="lg:p-5 p-2">
            <NavLink to={`/customer`} activeClassName="text-gold-200">
              {user.displayName}
            </NavLink>
          </li>
          <li className="lg:p-5 p-2">
            <div role="button" className="text-gold-200" onClick={handleOnClick}>
              <p>ออกจากระบบ</p>
            </div>
          </li>
        </>
      );
  }, [handleOnClick, loading, user]);

  return (
    <div className="text-white-100 w-1/5 h-100 bg-dark-100 hidden md:flex md:flex-col md:items-center">
      <p className="text-xl font-semibold text-gold-100 p-5">PERFUME HOUSE</p>
      <div className="w-4/5 border-b-4 border-gold-100 mx-auto rounded-full"></div>
      <ul className="text-center py-10">
        <li className="p-5">
          <NavLink exact to={`/`} activeClassName="text-gold-200">
            หน้าหลัก
          </NavLink>
        </li>
        <li className="p-5">
          <NavLink to={`/products`} activeClassName="text-gold-200">
            สินค้า
          </NavLink>
        </li>
        <li className="p-5">
          <NavLink to={`/promotions`} activeClassName="text-gold-200">
            โปรโมชั่น
          </NavLink>
        </li>
        {(user?.role === 'customer' || user?.role === 'admin') && (
          <li className="p-5">
            <NavLink to={`/cart`} activeClassName="text-gold-200">
              ตะกร้าสินค้า
            </NavLink>
          </li>
        )}
        {user?.role === 'admin' && (
          <li className="p-5">
            <NavLink to={`/admin`} activeClassName="text-gold-200">
              จัดการ
            </NavLink>
          </li>
        )}
      </ul>

      <ul className="font-semibold text-center w-100 flex lg:flex-row md:flex-col justify-between mt-auto lg:py-10 py-5">
        {userBox}
        {/* {!user && (
          <>
            <li className="lg:p-5 p-2">
              <NavLink exact to={`/login`} activeClassName="text-gold-200">
                Login
              </NavLink>
            </li>
            <li className="lg:p-5 p-2">
              <NavLink exact to={`/register`} activeClassName="text-gold-200">
                Register
              </NavLink>
            </li>
          </>
        )}

        {user && (
          <>
            <li className="lg:p-5 p-2">
              <NavLink to={`/customer`} activeClassName="text-gold-200">
                {user.displayName}
              </NavLink>
            </li>
            <li className="lg:p-5 p-2">
              <div role="button" className="text-gold-200" onClick={handleOnClick}>
                <p>ออกจากระบบ</p>
              </div>
            </li>
          </>
        )} */}
      </ul>
    </div>
  );
};

export default Navbar;
