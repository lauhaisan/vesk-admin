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
  FileUploader,
  Loading,
  Accordion,
  AccordionItem,
  Select,
  SelectItem,
} from "carbon-components-react";
import { ADVERTISING, UPLOAD } from "../../constant";
import { connect } from "react-redux";
import "./index.scss";

const listPosition = [
  { name: "Home", value: "HOME" },
  { name: "Top Rate", value: "TOP_RATED" },
  { name: "Most Popular", value: "MOST_POPULAR" },
  { name: "Fix Bottom", value: "FIX_BOTTOM" },
];

const listStatus = [
  { name: "PENDING", value: "PENDING" },
  { name: "ACTIVE", value: "ACTIVE" },
  { name: "INACTIVE", value: "INACTIVE" },
  { name: "REJECT", value: "REJECT" },
];

class Advertising extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      titleModal: "",
      isReview: false,
      fileUpload: null,
      isModeSearch: false,
      keywordSearch: "",
      currentPage: 1,
    };
  }

  static getDerivedStateFromProps(props) {
    if ("itemAds" in props) {
      return { itemAds: props.itemAds };
    }
    return null;
  }

  componentDidMount() {
    this.handleGetListAds(1);
  }

  componentDidUpdate(prevProps, prevState) {
    const { total } = this.props;
    const { total: prevTotal } = prevProps;
    const { currentPage, isModeSearch } = this.state;
    const { isModeSearch: prevIsModeSearch } = prevState;
    if (isModeSearch !== prevIsModeSearch) {
      this.setState({ currentPage: 1 });
    }
    if (total !== prevTotal) {
      const totalPage = Math.ceil(total / 10);
      const page = totalPage < currentPage ? currentPage - 1 : currentPage;
      this.setState({
        currentPage: page === 0 ? 1 : page,
      });
    }
  }

  componentWillUnmount() {
    const { updateStateReducer } = this.props;
    updateStateReducer({
      itemAds: {},
      actionAdsSuccessfully: "",
      messageError: "",
    });
  }

  handleGetListAds = (page) => {
    const { getListAds } = this.props;
    this.setState({ currentPage: page });
    getListAds({ page, limit: 10 });
  };

  _resetFilter = () => {
    this.setState(
      {
        isModeSearch: false,
        keywordSearch: "",
        currentPage: 1,
      },
      () => {
        this.handleGetListAds(1);
      }
    );
  };

  _search = ({ name }) => {
    this.setState({ keywordSearch: name, isModeSearch: true }, () => {
      this.handleGetValueSearch(1);
    });
  };

  handleGetValueSearch = (page) => {
    const { searchListAds } = this.props;
    const { keywordSearch } = this.state;
    this.setState({ currentPage: page });
    const payload = { name: keywordSearch, page, limit: 10 };
    searchListAds(payload);
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
    const { updateStateReducer, updateUploadReducer } = this.props;
    this.setState({
      openModal: false,
      isReview: false,
    });
    updateStateReducer({
      itemAds: {},
    });
    updateUploadReducer({
      link: "",
      messageUpload: "",
      linkContract: "",
    });
  };

  _handleSubmit = (event) => {
    event.preventDefault();
    const { editAds, addNewAds, linkAds } = this.props;
    const {
      itemAds,
      titleModal,
      isModeSearch,
      currentPage,
      keywordSearch,
    } = this.state;
    const payload = {
      ...itemAds,
      imageUrl: linkAds || itemAds.imageUrl,
      position: itemAds.position || "HOME",
      status: itemAds.status || "ACTIVE",
    };
    if (titleModal === "Add New Advertising") {
      addNewAds(
        payload,
        this._hideModal,
        currentPage,
        isModeSearch && keywordSearch
      );
    } else {
      editAds(
        payload,
        this._hideModal,
        currentPage,
        isModeSearch && keywordSearch
      );
    }
  };

  _handleDelete = () => {
    const { itemAds, isModeSearch, keywordSearch, currentPage } = this.state;
    const { deleteAds } = this.props;
    deleteAds(
      itemAds,
      this._hideModal,
      currentPage,
      isModeSearch && keywordSearch
    );
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

  handleFileChanged = (e, isContract) => {
    this.setState(
      {
        fileUpload: e.target.files[0],
      },
      () => {
        this.handleUploadToServer(isContract);
      }
    );
  };

  handleUploadToServer = (isContract) => {
    const { fileUpload } = this.state;
    const { uploadImage } = this.props;
    const formData = new FormData();
    formData.append("file", fileUpload);
    uploadImage({ file: formData, isContract });
  };

  render() {
    const {
      openModal,
      titleModal,
      isReview,
      itemAds,
      isModeSearch,
    } = this.state;
    const {
      loading,
      listAds = [],
      loadingGetAdsById,
      loadingActionAds,
      messageError,
      actionAdsSuccessfully,
      loadingUpload,
      linkAds,
      messageUpload,
      total,
    } = this.props;
    const imgAds = linkAds || itemAds.imageUrl;

    const checkId = itemAds && itemAds.id;

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
              {/* <FormGroup legendText="">
                <TextInput
                  id="inputPosition"
                  labelText="Position"
                  onChange={(event) =>
                    this.onChangeFormData("position", event.target.value)
                  }
                  required
                  readOnly={isReview}
                  light={true}
                  placeholder="Position"
                  type="text"
                  value={itemAds.position || ""}
                />
              </FormGroup> */}
              <FormGroup legendText="">
                <Select
                  disabled={titleModal !== "Add New Advertising"}
                  style={{ width: "11rem" }}
                  id="select-1"
                  invalidText="A valid value is required"
                  labelText="Select Position"
                  onChange={(event) =>
                    this.onChangeFormData("position", event.target.value)
                  }
                  value={itemAds.position || "HOME"}
                >
                  {listPosition.map((item) => {
                    const { name = "", value = "" } = item;
                    return <SelectItem key={value} text={name} value={value} />;
                  })}
                </Select>
              </FormGroup>
            </div>
            {/* <div className="formData__row">
              <FormGroup legendText="">
                <DatePicker
                  dateFormat="d/m/Y"
                  datePickerType="single"
                  onChange={(e) => this.onChangeDatePicker("ShowStartAt", e)}
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
                  onChange={(e) => this.onChangeDatePicker("ShowEndAt", e)}
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
              </FormGroup>
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
            </div> */}
            <div className="formData__row">
              <FormGroup legendText="">
                <TextInput
                  id="inputLinkTarget"
                  labelText="Link Target"
                  onChange={(event) =>
                    this.onChangeFormData("linkTarget", event.target.value)
                  }
                  required
                  readOnly={isReview}
                  light={true}
                  placeholder="Link Target"
                  type="text"
                  value={itemAds.linkTarget || ""}
                />
              </FormGroup>
              <FormGroup legendText="">
                <Select
                  disabled={titleModal === "Review Advertising"}
                  style={{ width: "11rem" }}
                  id="select-status"
                  invalidText="A valid value is required"
                  labelText="Status"
                  onChange={(event) =>
                    this.onChangeFormData("status", event.target.value)
                  }
                  value={itemAds.status || "ACTIVE"}
                >
                  {listStatus.map((item) => {
                    const { name = "", value = "" } = item;
                    return <SelectItem key={value} text={name} value={value} />;
                  })}
                </Select>
              </FormGroup>
            </div>
            {(titleModal === "Edit Advertising" ||
              titleModal === "Add New Advertising") && (
              <div className="buttonUpload">
                <FileUploader
                  accept={[".jpg", ".png"]}
                  buttonKind="primary"
                  buttonLabel="Upload Image"
                  labelTitle=""
                  onChange={(e) => this.handleFileChanged(e, true)}
                />
              </div>
            )}
            <div className="viewContract">
              {loadingUpload ? (
                <Loading small description="" withOverlay={false} />
              ) : (
                imgAds && (
                  <Fragment>
                    <div className="titleContract">Image Advertising:</div>
                    <img
                      className="viewContract__img"
                      src={imgAds}
                      alt="img-contract"
                    />
                  </Fragment>
                )
              )}
            </div>
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
        header: "Position",
        key: "position",
      },
      {
        header: "Link Target",
        key: "linkTarget",
      },
      {
        header: "Image",
        key: "imageUrl",
      },
      {
        header: "Point",
        key: "point",
      },
      { header: "Status", key: "status" },
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
              <Filter
                resetFilter={isModeSearch ? this._resetFilter : () => {}}
                search={this._search}
              />
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
            total={total}
            handlePagination={
              !isModeSearch ? this.handleGetListAds : this.handleGetValueSearch
            }
            resetFirstPage={isModeSearch}
          />
        </div>
        <CustomModal
          isReview={isReview || !checkId}
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
        {messageUpload === "Upload Image Failed" && (
          <Notification
            status="error"
            message={messageUpload}
            title="Upload Image Failed"
          />
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
    paging: { total } = {},
  } = {},
  upload: { loading: loadingUpload, messageUpload, linkContract: linkAds } = {},
}) => ({
  loading,
  listAds,
  paging,
  messageError,
  itemAds,
  loadingGetAdsById,
  loadingActionAds,
  actionAdsSuccessfully,
  loadingUpload,
  messageUpload,
  linkAds,
  total,
});

const mapDispatchToProps = (dispatch) => ({
  getListAds: (data) => dispatch({ type: ADVERTISING.GET_LIST_ADS, data }),
  searchListAds: (data) => dispatch({ type: ADVERTISING.SEARCH_ADS, data }),
  getAdsById: (id) =>
    dispatch({ type: ADVERTISING.GET_ADS_BY_ID, data: { id } }),
  addNewAds: (data, functionHideModal, currentPage, keywordSearch) =>
    dispatch({
      type: ADVERTISING.ADD_NEW_ADS,
      data: { data, functionHideModal, currentPage, keywordSearch },
    }),
  editAds: (data, functionHideModal, currentPage, keywordSearch) =>
    dispatch({
      type: ADVERTISING.EDIT_ADS,
      data: { data, functionHideModal, currentPage, keywordSearch },
    }),
  deleteAds: (data, functionHideModal, currentPage, keywordSearch) =>
    dispatch({
      type: ADVERTISING.DELETE_ADS,
      data: { data, functionHideModal, currentPage, keywordSearch },
    }),
  uploadImage: (data) =>
    dispatch({ type: UPLOAD.UPLOAD_IMAGE, data: { data } }),
  updateUploadReducer: (data) =>
    dispatch({ type: UPLOAD.UPDATE_STATE_UPLOAD_REDUCER, data }),
  updateStateReducer: (data) =>
    dispatch({ type: ADVERTISING.SET_STATE_REDUCER, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Advertising);
