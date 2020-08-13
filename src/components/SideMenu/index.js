import React, { PureComponent, Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";

export default class SideMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openUser: false
    };
  }

  componentDidMount() {
    if (window.location.pathname.includes("users")) {
      this.setState({
        openUser: true
      });
    }
  }

  handleClickUser = () => {
    const { openUser } = this.state;
    this.setState({
      openUser: !openUser
    });
  };

  render() {
    const { openUser } = this.state;
    const classNameMenu = "sideBar";
    const iconChevronUser = openUser
      ? "fas fa-chevron-up"
      : "fas fa-chevron-down";

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
          <Fragment>
            <div className="menu__parent" onClick={this.handleClickUser}>
              <span>Users</span>
              <i className={`${iconChevronUser} menu__parent__icon`}></i>
            </div>
            {openUser && (
              <Fragment>
                <NavLink
                  activeClassName={`${classNameMenu}__menu__itemMenu--active`}
                  to="/users"
                  className={`${classNameMenu}__menu__itemMenu`}
                >
                  <i className="fas fa-users itemMenu__icon"></i>
                  <span className="itemMenu__text">Manage</span>
                </NavLink>
                <NavLink
                  activeClassName={`${classNameMenu}__menu__itemMenu--active`}
                  to="/users-exchange/"
                  className={`${classNameMenu}__menu__itemMenu`}
                >
                  <i className="fas fa-exchange-alt itemMenu__icon"></i>
                  <span className="itemMenu__text">Exchange</span>
                </NavLink>
              </Fragment>
            )}
          </Fragment>

          {/* <NavLink
            activeClassName={`${classNameMenu}__menu__itemMenu--active`}
            to="/users"
            className={`${classNameMenu}__menu__itemMenu`}
          >
            <i className="fas fa-users itemMenu__icon"></i>
            <span className="itemMenu__text">Users</span>
          </NavLink> */}

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
