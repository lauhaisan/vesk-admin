import React, { Component } from "react";
import { EXCHANGE } from "../../constant";
import TableCommon from "../../components/TableCommon";
import { connect } from "react-redux";

class HistoryExchange extends Component {
  componentDidMount() {
    const { getHistoryExchange } = this.props;
    getHistoryExchange();
  }

  render() {
    const { listExchange = [], loading } = this.props;
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
        header: "Money",
        key: "money",
      },
      {
        header: "Point",
        key: "point",
      },
      { header: "Contract", key: "contract" },
    ];
    return (
      <TableCommon
        title="History Exchange"
        rowData={listExchange}
        headerData={headerData}
        loading={loading}
      />
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
