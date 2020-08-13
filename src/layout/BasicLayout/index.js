import React, { Component, Fragment } from "react";
import { Modal } from "carbon-components-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideMenu from "../../components/SideMenu";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getToken } from "../../utils/token";
import "./index.scss";

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
    const { token } = getToken();
    if (!token) {
      return <Redirect to="/signin" />;
    }
    return (
      <Fragment>
        <div className="container_basic_layout">
          <Header history={history} />
          <div className="body">
            <SideMenu history={history} />
            <div className="content">{children}</div>
          </div>
          <Footer />
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
