import React, { Component, Fragment } from "react";
import { EXCHANGE } from "../../constant";
import TableCommon from "../../components/TableCommon";
import CustomModal from "../../components/CustomModal";
import { connect } from "react-redux";
import "./index.scss";

class HistoryExchange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalApprove: false,
      itemExchange: {},
    };
  }

  componentDidMount() {
    const { getHistoryExchange } = this.props;
    getHistoryExchange();
  }

  actionApprove = ({ id }) => {
    const { listExchange = [] } = this.props;
    const itemExchange = listExchange.find((e) => e.id === id) || {};
    this.setState({ itemExchange, openModalApprove: true });
  };

  hideModal = () => {
    this.setState({
      itemExchange: {},
      openModalApprove: false,
    });
  };

  _renderContentModal = () => {
    const {
      itemExchange: { point = 0, coin = 0, email = "", message = "" } = {},
    } = this.state;
    return (
      <Fragment>
        <p>Approve this exchange?</p>
        <p>Email: {email}</p>
        <p>Message: {message}</p>
        <p>
          Coin: {coin}, Point: {point}
        </p>
      </Fragment>
    );
  };

  handleApprove = () => {
    const {
      itemExchange: {
        id = "",
        point = 0,
        coin = 0,
        message = "",
        contract = "",
      } = {},
    } = this.state;
    const payload = { id, point, coin, message, contract };
    console.log("payload", payload);
  };

  render() {
    const { listExchange = [], loading, loadingApprove } = this.props;
    const { openModalApprove } = this.state;
    const headerData = [
      {
        header: "Date",
        key: "date",
      },
      {
        header: "Exchange to",
        key: "email",
      },
      {
        header: "Message",
        key: "message",
      },
      {
        header: "Coin",
        key: "coin",
      },
      {
        header: "Point",
        key: "point",
      },
      { header: "Contract", key: "contract" },
      { header: "Status", key: "status" },
    ];
    return (
      <div className="rootHistoryExchange">
        <TableCommon
          title="History Exchange"
          rowData={listExchange}
          headerData={headerData}
          loading={loading}
          actionApprove={this.actionApprove}
        />
        <CustomModal
          open={openModalApprove}
          contentModal={this._renderContentModal()}
          title="Approve Exchange"
          hideModal={this.hideModal}
          onSubmit={this.handleApprove}
          loading={loadingApprove}
          textSubmit="Approve"
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  exchange: { loading, listExchange = [] } = {},
}) => ({
  loading,
  listExchange,
});

const mapDispatchToProps = (dispatch) => ({
  getHistoryExchange: () => dispatch({ type: EXCHANGE.GET_HISTORY_EXCHANGE }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryExchange);
