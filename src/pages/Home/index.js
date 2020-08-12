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
      dummyListVideo,
      history
    } = this.props;
    return (
      <div className="container_page_home">
        <TitlePage title="Home" />
        <div className="bx--row">
          {dummyListVideo.map(item => (
            <div
              className="bx--col"
              key={item._id}
              onClick={() => history.push(`detail/${item._id}`)}
            >
              <div className="item__video">
                <img
                  src={item.img}
                  alt={`Video ${item.title}`}
                  className="item__video__img"
                />
                <p className="item__video__title">{item.title}</p>
              </div>
            </div>
          ))}
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
