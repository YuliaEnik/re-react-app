import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

export const Navbar: React.FC = () => (
  <nav className="nav">
    <ul className="nav-list">
      <li className="nav-list_item">
        <NavLink className="link" data-testingid="home-link" to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-list_item">
        <NavLink className="link" data-testingid="form-link" to="/forms">
          Form
        </NavLink>
      </li>
      <li className="nav-list_item">
        <NavLink className="link" data-testingid="about-link" to="/about">
          About Us
        </NavLink>
      </li>
    </ul>
  </nav>
);
