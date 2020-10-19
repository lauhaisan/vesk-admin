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
    this.state = {
      isModeSearch: false,
      objFilter: {},
    };
  }

  componentDidMount() {
    this.handleGetListCreateWebsite(1);
  }

  _resetFilter = () => {
    this.setState(
      {
        isModeSearch: false,
        objFilter: {},
      },
      () => {
        this.handleGetListCreateWebsite(1);
      }
    );
  };

  _search = (value) => {
    this.setState({ objFilter: value, isModeSearch: true }, () => {
      this.handleGetListCreateWebsite(1);
    });
  };

  handleGetListCreateWebsite = (page) => {
    const { getListCreateWeb } = this.props;
    const { isModeSearch, objFilter } = this.state;
    const payloadSearch = isModeSearch ? objFilter : {};
    getListCreateWeb({ ...payloadSearch, page, limit: 10 });
  };

  render() {
    const { loading, listCreateWeb = [], total } = this.props;
    const { isModeSearch } = this.state;
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
              <Filter
                resetFilter={isModeSearch ? this._resetFilter : () => {}}
                search={this._search}
              />
            </AccordionItem>
          </Accordion>
          <TableCommon
            title="List Create Website"
            rowData={listCreateWeb}
            headerData={headerData}
            loading={loading}
            total={total}
            handlePagination={this.handleGetListCreateWebsite}
            resetFirstPage={isModeSearch}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  createWeb: { loading, listCreateWeb, paging: { total } = {} } = {},
}) => ({
  loading,
  listCreateWeb,
  total,
});

const mapDispatchToProps = (dispatch) => ({
  getListCreateWeb: (data) =>
    dispatch({ type: CREATE_WEBSITE.CREATE_WEBSITE, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateWebsite);
