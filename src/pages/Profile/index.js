import React, { Component } from "react";
import TitlePage from "../../components/TitlePage";
import { connect } from "react-redux";
import { getToken } from "../../utils/token";

class Profile extends Component {
  render() {
    // const { history } = this.props;
    const { data } = getToken();
    return (
      <div style={{ backgroundColor: "#fff", width: "76%", height: "500px" }}>
        <TitlePage title={`${data.userName} | Profile`} />
        <h1>This is profile {data.userName}</h1>
      </div>
    );
  }
}
const mapStateToProps = ({ user: { myInfo = {} } = {} }) => ({
  myInfo
});

const mapDispatchToProps = dispatch => ({
  // getMyInfo: () => dispatch({ type: "GET_MY_INFO" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
