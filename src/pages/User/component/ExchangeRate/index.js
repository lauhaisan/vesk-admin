import React, { Component, Fragment } from "react";
import { NumberInput } from "carbon-components-react";
import numeral from "numeral";
import ButtonLoading from "../../../../components/ButtonLoading";
import ButtonOutline from "../../../../components/ButtonOutline";
import { EXCHANGE } from "../../../../constant";
import { connect } from "react-redux";
import "./index.scss";

class ExchangeRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      rate: 0,
    };
  }

  componentDidMount() {
    const { getExchangeRate, rate } = this.props;
    getExchangeRate();
    this.setState({
      rate,
    });
  }

  shouldComponentUpdate(nextProps) {
    const { rate } = this.props;
    const { rate: nextRate } = nextProps;
    if (rate !== nextRate) {
      this.setState({
        rate: nextRate,
      });
    }
    return true;
  }

  handleBtnEdit = () => {
    this.setState({
      isEdit: true,
    });
  };

  handleBtnCancel = () => {
    const { rate = 0 } = this.props;
    this.setState({
      isEdit: false,
      rate,
    });
  };

  hideEdit = () => {
    this.setState({
      isEdit: false,
    });
  };

  handleBtnSave = () => {
    const { rate } = this.state;
    const { updateExchangeRate, idRate } = this.props;
    const payload = { rate, idRate };
    updateExchangeRate(payload, this.hideEdit);
  };

  onChangeNumber = (rate) => {
    this.setState({
      rate,
    });
  };

  render() {
    const { isEdit, rate } = this.state;
    const { loadingUpdate, loading } = this.props;
    const formatRate = numeral(rate).format("0.[00]");
    return (
      <div className="rootExchangeRate">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Fragment>
            <NumberInput
              id="inputCoint"
              disabled={!isEdit}
              onChange={(event) =>
                this.onChangeNumber(event.imaginaryTarget.valueAsNumber)
              }
              label=""
              min={0}
              step={1}
              value={formatRate}
            />
            <Fragment>
              {!isEdit ? (
                <ButtonLoading text="Edit" onClick={this.handleBtnEdit} />
              ) : (
                <div className="rootExchangeRate__viewBtn">
                  <ButtonOutline text="Cancel" onClick={this.handleBtnCancel} />
                  <ButtonLoading
                    text="Save"
                    onClick={this.handleBtnSave}
                    loading={loadingUpdate}
                    style={{ marginLeft: "1rem", height: "42px" }}
                  />
                </div>
              )}
            </Fragment>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  exchange: {
    loading,
    loadingUpdate,
    exchangeRate: { id: idRate = "", rate = 0 } = {},
  } = {},
}) => ({
  loading,
  idRate,
  rate,
  loadingUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  getExchangeRate: () => dispatch({ type: EXCHANGE.GET_EXCHANGE_RATE }),
  updateExchangeRate: (data, functionHideEdit) =>
    dispatch({
      type: EXCHANGE.UPDATE_EXCHANGE_RATE,
      data: { data, functionHideEdit },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRate);
