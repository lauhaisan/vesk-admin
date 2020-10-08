import React, { Component, Fragment } from "react";
import { EXCHANGE } from "../../constant";
import TableCommon from "../../components/TableCommon";
import CustomModal from "../../components/CustomModal";
import Notification from "../../components/Notification";
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

  componentWillUnmount() {
    const { updateExchangeReducer } = this.props;
    updateExchangeReducer({
      isApproveSuccessfully: "",
      messageApprove: "",
    });
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
      itemExchange: {
        point = 0,
        coin = 0,
        email = "",
        message = "",
        contract = "",
      } = {},
    } = this.state;
    const arr = [
      { key: "Email", value: email },
      { key: "Message", value: message },
    ];
    return (
      <Fragment>
        {arr.map((item) => {
          const { key, value } = item;
          return (
            <div key={key}>
              <span className="approveExchange__title">{key}: </span>
              <span className="approveExchange__value">{value}</span>
            </div>
          );
        })}
        <div>
          <span className="approveExchange__title">Coin: </span>
          <span className="approveExchange__value">{coin}</span>
          <span className="approveExchange__title">, Point: </span>
          <span className="approveExchange__value">{point}</span>
        </div>
        <div className="viewContract" style={{ marginTop: "20px" }}>
          <a target="_blank" rel="noopener noreferrer" href={contract}>
            <img
              className="viewContract__img"
              src={contract}
              alt="img-contract"
            />
          </a>
        </div>
      </Fragment>
    );
  };

  handleApprove = () => {
    const { approveExchange } = this.props;
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
    approveExchange(payload, this.hideModal);
  };

  render() {
    const {
      listExchange = [],
      loading,
      loadingApprove,
      isApproveSuccessfully,
      messageApprove,
    } = this.props;
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
          title="Approve Contract"
          hideModal={this.hideModal}
          onSubmit={this.handleApprove}
          loading={loadingApprove}
          textSubmit="Approve"
        />
        {isApproveSuccessfully && (
          <Notification
            status="success"
            title="Approve Contract Successfully"
          />
        )}
        {messageApprove && (
          <Notification status="error" title={messageApprove} />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  exchange: {
    loading,
    listExchange = [],
    loadingUpdate: loadingApprove,
    isApproveSuccessfully,
    messageApprove,
  } = {},
}) => ({
  loading,
  listExchange,
  loadingApprove,
  isApproveSuccessfully,
  messageApprove,
});

const mapDispatchToProps = (dispatch) => ({
  getHistoryExchange: () => dispatch({ type: EXCHANGE.GET_HISTORY_EXCHANGE }),
  approveExchange: (data, functionHideModal) =>
    dispatch({
      type: EXCHANGE.APPROVE_EXCHANGE,
      data: { data, functionHideModal },
    }),
  updateExchangeReducer: (data) =>
    dispatch({ type: EXCHANGE.UPDATE_EXCHANGE_REDUCER, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryExchange);
