import React, { FC } from "react";
import { NavLink } from "react-router-dom";

const Navbar: FC = () => {
  return (
    <div className="w-1/5 h-100 nav-color flex flex-col items-center text-white">
      <h1 className="text-xl font-semibold text-gold-100 p-5">Untitled</h1>
      <hr className="h-1 w-4/5 color-gold mx-auto"></hr>
      <ul className="text-center py-10">
        <li className="p-5 text-white">
          <NavLink exact to={`/`} activeClassName="text-gold-200">
            Home
          </NavLink>
        </li>
        <li className="p-5">
          <NavLink to={`/product`} activeClassName="text-gold-200">
            Products
          </NavLink>
        </li>
        <li className="p-5">
          <NavLink to={`/promotion`} activeClassName="text-gold-200">
            Promotion
          </NavLink>
        </li>
        {/* To-do: Admin role checking
          <li className="p-5">
            <NavLink to={`/admin`} activeClassName="text-gold-200">
              Admin
            </NavLink>
          </li>
        */}
        <li className="p-5">
          <NavLink to={`/cart`} activeClassName="text-gold-200">
            Cart
          </NavLink>
        </li>
      </ul>
      <ul className="flex flex-row justify-between p-10 w-100 mt-auto">
        <li className="p-5">
          <NavLink exact to={`/login`} activeClassName="text-gold-200">
            Login
          </NavLink>
        </li>
        <li className="p-5">
          <NavLink exact to={`/register`} activeClassName="text-gold-200">
            Register
          </NavLink>
        </li>
        {/* To-do: Authentication checking
          <li className="p-5">
            <NavLink to={`/account`} activeClassName="text-gold-200">
              Account
            </NavLink>
          </li>
          <li className="p-5">
            <NavLink to={`/logout`} activeClassName="text-gold-200">
              Logout
            </NavLink>
          </li>
        */}
      </ul>
    </div>
  );
};

export default Navbar;
