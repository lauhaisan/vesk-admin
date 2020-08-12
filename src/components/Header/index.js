import React, { Component, Fragment } from "react";
import {
  Header,
  HeaderContainer,
  HeaderGlobalBar
} from "carbon-components-react/lib/components/UIShell";
import {
  UserProfile20,
  Logout20,
  ChevronSortDown20
  // Menu20
} from "@carbon/icons-react";
import { getToken, setToken } from "../../utils/token";
import "./index.scss";

class ComponentHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = () => {
    const {
      history
      //  logout
    } = this.props;
    setToken(undefined);
    history.push("/");
  };

  render() {
    const { history } = this.props;
    const { token, data = {} } = getToken();

    const rightMenuSignIn = (
      <Fragment>
        <div className="rightMenu" onClick={this.showDropDownMenu}>
          <img
            className="rightMenu__avatar"
            src={require("../../images/testAvatar.jpg")}
            alt="img-avatar"
          />
          <p className="rightMenu__textName">{data.userName}</p>
          <ChevronSortDown20 className="icon" />
        </div>
        <div className="dropDownMenu">
          <div
            className="dropDownMenu__item"
            onClick={() => history.push("/profile")}
          >
            <UserProfile20 />
            <p className="dropDownMenu__item--text">Profile</p>
          </div>
          <div className="dropDownMenu__item" onClick={this.handleLogout}>
            <Logout20 />
            <p className="dropDownMenu__item--text">Logout</p>
          </div>
        </div>
      </Fragment>
    );
    const rightMenuNotSignIn = (
      <Fragment>
        <div
          className="rightMenuLogin rightMenuLogin__text"
          onClick={() => history.push("/signin")}
        >
          Sign In
        </div>
        <div
          className="rightMenuLogin"
          style={{ padding: "0px", color: "#acb7b8" }}
        >
          |
        </div>
        <div
          className="rightMenuLogin rightMenuLogin__text"
          onClick={() => history.push("/signup")}
        >
          Sign Up
        </div>
      </Fragment>
    );
    return (
      <div className="rootHeader" style={{ height: "auto" }}>
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <>
              <Header aria-label="IBM Platform Name">
                {/* <div
                  style={{ color: "#acb7b8", marginLeft: "1rem" }}
                  onClick={handleMenu}
                >
                  <Menu20 />
                </div> */}
                <HeaderGlobalBar>
                  {token ? rightMenuSignIn : rightMenuNotSignIn}
                </HeaderGlobalBar>
              </Header>
            </>
          )}
        />
      </div>
    );
  }
}

export default ComponentHeader;
