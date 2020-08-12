import React, { Component } from "react";
import { connect } from "react-redux";
import TitlePage from "../../components/TitlePage";
import "./index.scss";

class Home extends Component {
  // componentDidMount() {
  //   const { getAllProduct } = this.props;
  //   getAllProduct();
  // }

  _setData = () => {
    const { setData } = this.props;
    setData({
      messageError: "Hmmm..."
    });
  };

  componentWillUnmount() {
    const { clearData } = this.props;
    clearData();
  }
  render() {
    const {
      // loading,
      // listProduct,
      // messageError,
      // clearData,
      // getAllProduct
      history
    } = this.props;
    return (
      <div className="container_page_home">
        <TitlePage title="Home" />
        <div className="bx--row">
          <div className="bx--col">
            <div className="test__item">Block 1</div>
          </div>
          <div className="bx--col">
            <div className="test__item">Block 1</div>
          </div>
          <div className="bx--col">
            <div className="test__item">Block 1</div>
          </div>
          <div className="bx--col">
            <div className="test__item">Block 1</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  products: {
    loading,
    listProduct = [],
    messageError = "",
    dummyListVideo
  } = {}
}) => ({
  loading,
  listProduct,
  messageError,
  dummyListVideo
});

const mapDispatchToProps = dispatch => ({
  getAllProduct: () => dispatch({ type: "GET_ALL_PRODUCT" }),
  clearData: () => dispatch({ type: "CLEAR_DATA" }),
  setData: data => dispatch({ type: "SET_STATE_REDUCER", data })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
