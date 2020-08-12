import React, { Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import TableCommon from "../../components/TableCommon";
import { USER } from "../../constant";
import { connect } from "react-redux";
class Users extends React.Component {
  _actionReview = item => {
    const {getUserInfo} = this.props;
    console.log("item ",item)
    getUserInfo({id:"69b8dbe6-a17e-44f5-b0ca-3757a6916492"})
  };

  _actionDelete = item => {
    console.log("delete", item);
  };

  _actionEdit = item => {
    console.log("edit", item);
  };

  render() {
    const headerData = [
      {
        header: "Name123",
        key: "name"
      },
      {
        header: "Protocol",
        key: "protocol"
      },
      {
        header: "Port",
        key: "port"
      },
      {
        header: "Rule",
        key: "rule"
      },
      {
        header: "Attached Groups",
        key: "attached_groups"
      },
      {
        header: "Status",
        key: "status"
      },
      { header: "Action", key: "action" }
    ];
    const rowData = [
      {
        attached_groups: "Kevins VM Groups",
        id: "a",
        name: "Load Balancer 3",
        port: 3000,
        protocol: "HTTP",
        rule: "Round robin",
        status: "Disabled"
      },
      {
        attached_groups: "Maureens VM Groups",
        id: "b",
        name: "Load Balancer 1",
        port: 443,
        protocol: "HTTP",
        rule: "Round robin",
        status: "Starting"
      },
      {
        attached_groups: "Andrews VM Groups",
        id: "c",
        name: "Load Balancer 2",
        port: 80,
        protocol: "HTTP",
        rule: "DNS delegation",
        status: "Active"
      },
      {
        attached_groups: "Marcs VM Groups",
        id: "d",
        name: "Load Balancer 6",
        port: 3000,
        protocol: "HTTP",
        rule: "Round robin",
        status: "Disabled"
      },
      {
        attached_groups: "Mels VM Groups",
        id: "e",
        name: "Load Balancer 4",
        port: 443,
        protocol: "HTTP",
        rule: "Round robin",
        status: "Starting"
      },
      {
        attached_groups: "Ronjas VM Groups",
        id: "f",
        name: "Load Balancer 5",
        port: 80,
        protocol: "HTTP",
        rule: "DNS delegation",
        status: "Active"
      }
    ];
    return (
      <Fragment>
        <TitlePage title="Users" />
        <div
          style={{
            backgroundColor: "#fff",
            cursor: "pointer",
            marginTop: "20px"
          }}
          // onClick={() => history.push("/users/1")}
        >
          <TableCommon
            title="Table"
            rowData={rowData}
            headerData={headerData}
            actionReview={this._actionReview}
            actionEdit={this._actionEdit}
            actionDelete={this._actionDelete}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  user: {loading, listUser, userInfo } = {}
}) => ({
  loading, listUser, userInfo
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: (data) =>
    dispatch({ type: USER.GET_USER_INFO, data  }),
  // updateStateReducer: data => dispatch({ type: "UPDATE_STATE", data })
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
