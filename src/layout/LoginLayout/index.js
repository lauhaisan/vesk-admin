import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { getToken } from "../../utils/token";
import "./index.scss";

class LoginLayout extends Component {
  render() {
    const { children } = this.props;
    const { token } = getToken();
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container_login_layout">
        <div className="children">{children}</div>
      </div>
    );
  }
}

export default LoginLayout;
