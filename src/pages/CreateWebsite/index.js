import React, { Component, Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import TableCommon from "../../components/TableCommon";
import Filter from "./component/Filter";
import { Accordion, AccordionItem } from "carbon-components-react";
import { CREATE_WEBSITE } from "../../constant";
import { connect } from "react-redux";
import "./index.scss";

class CreateWebsite extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getListCreateWeb } = this.props;
    getListCreateWeb({});
  }

  _resetFilter = () => {
    const { getListCreateWeb } = this.props;
    getListCreateWeb({});
  };

  _search = (value) => {
    const { getListCreateWeb } = this.props;
    getListCreateWeb(value);
  };

  render() {
    const { loading, listCreateWeb = [] } = this.props;
    const headerData = [
      {
        header: "Email",
        key: "email",
      },
      {
        header: "Phone",
        key: "phone",
      },
      {
        header: "Demand",
        key: "demand",
      },
      {
        header: "Content",
        key: "content",
      },
    ];

    return (
      <Fragment>
        <TitlePage title="Users" />
        <div className="containerUserPage">
          <Accordion className="viewFilter">
            <AccordionItem
              open
              title={
                <div className="viewFilter__title">
                  Filter
                  <i className="fas fa-filter viewFilter__title--icon"></i>
                </div>
              }
            >
              <Filter resetFilter={this._resetFilter} search={this._search} />
            </AccordionItem>
          </Accordion>
          <TableCommon
            title="List Create Website"
            rowData={listCreateWeb}
            headerData={headerData}
            loading={loading}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ createWeb: { loading, listCreateWeb } = {} }) => ({
  loading,
  listCreateWeb,
});

const mapDispatchToProps = (dispatch) => ({
  getListCreateWeb: (data) =>
    dispatch({ type: CREATE_WEBSITE.CREATE_WEBSITE, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateWebsite);
