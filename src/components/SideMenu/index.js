import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";

export default class SideMenu extends PureComponent {
  render() {
    const classNameMenu = "closeLeftPanel";
    return (
      <div className={classNameMenu}>
        <div className={`${classNameMenu}__menu`}>
          <NavLink
            exact
            activeClassName={`${classNameMenu}__menu__itemMenu--active`}
            to="/"
            className={`${classNameMenu}__menu__itemMenu`}
          >
            <i className="fas fa-home itemMenu__icon"></i>
            <span className="itemMenu__text">Home</span>
          </NavLink>

          <NavLink
            activeClassName={`${classNameMenu}__menu__itemMenu--active`}
            to="/users"
            className={`${classNameMenu}__menu__itemMenu`}
          >
            <i className="fas fa-users itemMenu__icon"></i>
            <span className="itemMenu__text">Users</span>
          </NavLink>

          <NavLink
            activeClassName={`${classNameMenu}__menu__itemMenu--active`}
            to="/contact"
            className={`${classNameMenu}__menu__itemMenu`}
          >
            <i className="fas fa-address-book itemMenu__icon"></i>
            <span className="itemMenu__text">Contact</span>
          </NavLink>
        </div>
      </div>
    );
  }
}
