import React, { Component, Fragment, PureComponent } from "react";
import { Modal } from "carbon-components-react";
import { NavLink } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { connect } from "react-redux";
import "./index.scss";

class LeftMenu extends PureComponent {
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
            <i class="fas fa-home itemMenu__icon"></i>
            <span className="itemMenu__text">Home</span>
          </NavLink>

          <NavLink
            activeClassName={`${classNameMenu}__menu__itemMenu--active`}
            to="/users"
            className={`${classNameMenu}__menu__itemMenu`}
          >
            <i class="fas fa-users itemMenu__icon"></i>
            <span className="itemMenu__text">Users</span>
          </NavLink>

          <NavLink
            activeClassName={`${classNameMenu}__menu__itemMenu--active`}
            to="/contact"
            className={`${classNameMenu}__menu__itemMenu`}
          >
            <i class="fas fa-address-book itemMenu__icon"></i>
            <span className="itemMenu__text">Contact</span>
          </NavLink>
        </div>
      </div>
    );
  }
}

class BasicLayout extends Component {
  hideModal = () => {
    const { setDataUserReducer } = this.props;
    setDataUserReducer({
      expiredToken: false
    });
  };

  _logout = history => {
    const { logout } = this.props;
    logout(history);
  };

  render() {
    const { children, history, expiredToken } = this.props;
    return (
      <Fragment>
        <div className="container_basic_layout">
          <Header history={history} />
          <div className="body">
            <LeftMenu />
            <div style={{ width: "100%" }}>
              <div className="content">
                <div style={{ width: "100%" }}>{children}</div>
                <div className="ads">
                  <img
                    src={require("../../images/ad-tall-226x455-01.jpg")}
                    alt="ads"
                    className="ads__img"
                  />
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
        <Modal
          className="some-class"
          modalHeading="Token Expired"
          onRequestClose={this.hideModal}
          onRequestSubmit={() => this._logout(undefined)}
          onSecondarySubmit={this.hideModal}
          open={expiredToken}
          primaryButtonText="Sign In"
          secondaryButtonText="Cancel"
          size={undefined}
        >
          <p className="bx--modal-content__text">Please Sign In Again!!!</p>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  user: { expiredToken, myInfo = {}, widthMenu } = {}
}) => ({
  expiredToken,
  myInfo,
  widthMenu
});

const mapDispatchToProps = dispatch => ({
  getMyInfo: () => dispatch({ type: "GET_MY_INFO" }),
  setDataUserReducer: data => dispatch({ type: "UPDATE_STATE", data }),
  logout: data => dispatch({ type: "USER_LOGOUT", data })
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);
