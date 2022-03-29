import React from "react";
import "../styles/Menu.sass";
import logo from "../Assets/Logo.svg";

const Menu = () => {
  return (
    <nav>
      <div className="block_color_black"></div>
      <div className="container__navbar">
      <div className="navbar">
        <img src={logo} className="navbar__logo" />
        <ul className="navbar-content">
          <li>
          <a href="#users">
            <button className="button">Users</button>
            </a>
          </li>
          <li>
          <a href="#signUp">
            <button className="button">Sign up</button>
          </a>
          </li>
        </ul>
      </div>
      </div>
    </nav>
  );
};

export default Menu;
