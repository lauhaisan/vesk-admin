import React, { Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import TableCommon from "../../components/TableCommon";
import CustomModal from "../../components/CustomModal";
import ButtonLoading from "../../components/ButtonLoading";
import Notification from "../../components/Notification";
import { AddFilled32 } from "@carbon/icons-react";
import Filter from "./component/Filter";
import moment from "moment";
import {
  Form,
  FormGroup,
  TextInput,
  // DatePicker,
  // DatePickerInput,
  Loading,
  Accordion,
  AccordionItem,
} from "carbon-components-react";
import { ADVERTISING } from "../../constant";
import { connect } from "react-redux";
import "./index.scss";

class Advertising extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      titleModal: "",
      isReview: false,
    };
  }

  static getDerivedStateFromProps(props) {
    if ("itemAds" in props) {
      return { itemAds: props.itemAds };
    }
    return null;
  }

  componentDidMount() {
    this.handleGetListAds({});
  }

  componentWillUnmount() {
    const { updateStateReducer } = this.props;
    updateStateReducer({
      itemAds: {},
      actionAdsSuccessfully: "",
      messageError: "",
    });
  }

  handleGetListAds = (payload) => {
    const { getListAds } = this.props;
    getListAds(payload);
  };

  _resetFilter = () => {
    this.handleGetListAds({});
  };

  _search = (value) => {
    alert(`search by name:${value.name}, link target:${value.linkTarget}`);
    //call api getListUser with payload is value;
    // this.handleGetListUser(value)
  };

  openModalAddNewAdvertising = () => {
    this.setState({
      titleModal: "Add New Advertising",
      openModal: true,
    });
  };

  handeGetAdsById = (id) => {
    const { getAdsById } = this.props;
    getAdsById(id);
  };

  _actionReview = (item) => {
    this.handeGetAdsById(item.id);
    this.setState({
      openModal: true,
      titleModal: "Review Advertising",
      isReview: true,
    });
  };

  onChangeDatePicker = (key, e) => {
    const value = e.target ? e.target.value : e[0];
    const valueDate = moment(value).format("DD/MM/YYYY");
    let { itemAds } = this.state;
    itemAds[key] = valueDate;
    this.setState({
      itemAds,
    });
  };

  onChangeFormData = (key, value) => {
    let { itemAds } = this.state;
    itemAds[key] = value;
    this.setState({
      itemAds,
    });
  };

  _hideModal = () => {
    const { updateStateReducer } = this.props;
    this.setState({
      openModal: false,
      isReview: false,
    });
    updateStateReducer({
      itemAds: {},
    });
  };

  _handleSubmit = (event) => {
    event.preventDefault();
    const { editAds, addNewAds } = this.props;
    const { itemAds, titleModal } = this.state;
    if (titleModal === "Add New Advertising") {
      addNewAds(itemAds, this._hideModal);
    } else {
      editAds(itemAds, this._hideModal);
    }
  };

  _handleDelete = () => {
    const { itemAds } = this.state;
    const { deleteAds } = this.props;
    deleteAds(itemAds, this._hideModal);
  };

  _actionDelete = (item) => {
    this.handeGetAdsById(item.id);
    this.setState({
      openModal: true,
      titleModal: "Delete Advertising",
    });
  };

  _actionEdit = (item) => {
    this.handeGetAdsById(item.id);
    this.setState({
      openModal: true,
      titleModal: "Edit Advertising",
    });
  };

  render() {
    const { openModal, titleModal, isReview, itemAds } = this.state;
    const {
      loading,
      listAds = [],
      loadingGetAdsById,
      loadingActionAds,
      messageError,
      actionAdsSuccessfully,
    } = this.props;
    const contentModal = (
      <div style={{ height: "auto", width: "100%" }}>
        {loadingGetAdsById ? (
          <div className="modalLoading">
            <Loading withOverlay={false} />
          </div>
        ) : (
          <Form className="formData">
            <div className="formData__row">
              <FormGroup legendText="">
                <TextInput
                  // disabled={titleModal !== "Add New Advertising"}
                  id="inputName"
                  labelText="Name"
                  onChange={(event) =>
                    this.onChangeFormData("name", event.target.value)
                  }
                  required
                  readOnly={isReview}
                  light={true}
                  placeholder="Name"
                  type="text"
                  value={itemAds.name || ""}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  id="inputPosition"
                  labelText="Position"
                  onChange={(event) =>
                    this.onChangeFormData("Position", event.target.value)
                  }
                  required
                  readOnly={isReview}
                  light={true}
                  placeholder="Position"
                  type="text"
                  value={itemAds.Position || ""}
                />
              </FormGroup>
            </div>
            <div className="formData__row">
              {/* <FormGroup legendText="">
                <DatePicker
                  dateFormat="d/m/Y"
                  datePickerType="single"
                  onChange={e => this.onChangeDatePicker("ShowStartAt", e)}
                >
                  <DatePickerInput
                    disabled={isReview}
                    id="inputStart"
                    placeholder="Start"
                    labelText="Start"
                    type="text"
                    value={itemAds.ShowStartAt || ""}
                  />
                </DatePicker>
              </FormGroup>
              <FormGroup legendText="">
                <DatePicker
                  dateFormat="d/m/Y"
                  datePickerType="single"
                  onChange={e => this.onChangeDatePicker("ShowEndAt", e)}
                >
                  <DatePickerInput
                    disabled={isReview}
                    id="inputEnd"
                    placeholder="End"
                    labelText="End"
                    type="text"
                    value={itemAds.ShowEndAt || ""}
                  />
                </DatePicker>
              </FormGroup> */}
              <FormGroup legendText="">
                <TextInput
                  id="inputStart"
                  labelText="Start"
                  onChange={(event) =>
                    this.onChangeFormData("ShowStartAt", event.target.value)
                  }
                  required
                  readOnly={isReview}
                  light={true}
                  placeholder="Start"
                  type="text"
                  value={itemAds.ShowStartAt || ""}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  id="inputEnd"
                  labelText="End"
                  onChange={(event) =>
                    this.onChangeFormData("ShowEndAt", event.target.value)
                  }
                  required
                  readOnly={isReview}
                  light={true}
                  placeholder="End"
                  type="text"
                  value={itemAds.ShowEndAt || ""}
                />
              </FormGroup>
            </div>
            <div className="formData__row">
              <FormGroup legendText="">
                <TextInput
                  id="point"
                  labelText="Point"
                  onChange={(event) =>
                    this.onChangeFormData("point", event.target.value)
                  }
                  required
                  readOnly={isReview}
                  light={true}
                  placeholder="Point"
                  type="text"
                  value={itemAds.point || ""}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  id="inputImageUrl"
                  labelText="Image Url"
                  onChange={(event) =>
                    this.onChangeFormData("ImageUrl", event.target.value)
                  }
                  required
                  readOnly={isReview}
                  light={true}
                  placeholder="Image Url"
                  type="text"
                  value={itemAds.ImageUrl || ""}
                />
              </FormGroup>
            </div>
            <FormGroup legendText="">
              <TextInput
                // disabled={titleModal !== "Add New Advertising"}
                id="inputLinkTarget"
                labelText="Link Target"
                onChange={(event) =>
                  this.onChangeFormData("LinkTarget", event.target.value)
                }
                required
                readOnly={isReview}
                light={true}
                placeholder="Link Target"
                type="text"
                value={itemAds.LinkTarget || ""}
              />
            </FormGroup>
          </Form>
        )}
      </div>
    );

    const contentDeleteModal = (
      <div style={{ height: "auto", width: "100%" }}>
        {loadingGetAdsById
          ? "Loading..."
          : `Are you sure delete ${itemAds.name}?`}
      </div>
    );

    const renderContentModal =
      titleModal === "Delete Advertising" ? contentDeleteModal : contentModal;

    const headerData = [
      {
        header: "Name",
        key: "name",
      },
      {
        header: "Created",
        key: "createdAt",
      },
      {
        header: "Start",
        key: "ShowStartAt",
      },
      {
        header: "End",
        key: "ShowEndAt",
      },
      {
        header: "Position",
        key: "Position",
      },
      {
        header: "Link Target",
        key: "LinkTarget",
      },
      {
        header: "Image URL",
        key: "ImageUrl",
      },
      {
        header: "Point",
        key: "point",
      },
      { header: "Action", key: "action" },
    ];

    return (
      <Fragment>
        <TitlePage title="Advertising" />
        <div className="containerUserPage">
          <ButtonLoading
            text="Add"
            onClick={this.openModalAddNewAdvertising}
            renderIcon={AddFilled32}
          />
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
            title="List Advertising"
            rowData={listAds}
            headerData={headerData}
            loading={loading}
            actionReview={this._actionReview}
            actionEdit={this._actionEdit}
            actionDelete={this._actionDelete}
          />
        </div>
        <CustomModal
          isReview={isReview}
          open={openModal}
          loading={loadingActionAds}
          contentModal={renderContentModal}
          hideModal={this._hideModal}
          textSubmit={titleModal === "Delete Advertising" ? "Delete" : "Save"}
          onSubmit={
            titleModal !== "Delete Advertising"
              ? this._handleSubmit
              : this._handleDelete
          }
          title={titleModal}
        />

        {!actionAdsSuccessfully && messageError !== "" && (
          <Notification
            status="error"
            message={messageError}
            title={`${titleModal} Failed`}
          />
        )}
        {actionAdsSuccessfully && (
          <Notification status="success" title={`${titleModal} Successfully`} />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  advertising: {
    loading,
    listAds,
    paging,
    messageError,
    itemAds,
    loadingGetAdsById,
    loadingActionAds,
    actionAdsSuccessfully,
  } = {},
}) => ({
  loading,
  listAds,
  paging,
  messageError,
  itemAds,
  loadingGetAdsById,
  loadingActionAds,
  actionAdsSuccessfully,
});

const mapDispatchToProps = (dispatch) => ({
  getListAds: (data) => dispatch({ type: ADVERTISING.GET_LIST_ADS, data }),
  getAdsById: (id) =>
    dispatch({ type: ADVERTISING.GET_ADS_BY_ID, data: { id } }),
  editAds: (data, functionHideModal) =>
    dispatch({ type: ADVERTISING.EDIT_ADS, data: { data, functionHideModal } }),
  updateStateReducer: (data) =>
    dispatch({ type: ADVERTISING.SET_STATE_REDUCER, data }),
  deleteAds: (data, functionHideModal) =>
    dispatch({
      type: ADVERTISING.DELETE_ADS,
      data: { data, functionHideModal },
    }),
  addNewAds: (data, functionHideModal) =>
    dispatch({
      type: ADVERTISING.ADD_NEW_ADS,
      data: { data, functionHideModal },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Advertising);
