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
  NumberInput,
  FileUploader,
  Loading,
  Accordion,
  AccordionItem,
  Toggle,
  Select,
  SelectItem,
} from "carbon-components-react";
import { LIST_USER, SOCIAL_MEDIA, UPLOAD } from "../../constant";
import { connect } from "react-redux";
import "./index.scss";

class SocialMedia extends React.Component {
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
    if ("itemMediaSocial" in props) {
      return { itemMediaSocial: props.itemMediaSocial };
    }
    return null;
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

  componentDidMount() {
    this.handleGetListSocialMedia(1);
    this.handleGetListUser({});
  }

  componentWillUnmount() {
    const { updateStateReducer } = this.props;
    updateStateReducer({
      itemMediaSocial: {},
      actionSuccessfully: "",
      messageError: "",
    });
  }

  handleGetListSocialMedia = (page) => {
    const { getListSocialMedia } = this.props;
    this.setState({ currentPage: page });
    getListSocialMedia({ page, limit: 10 });
  };

  handleGetListUser = (payload) => {
    const { getListUser } = this.props;
    getListUser(payload);
  };

  _resetFilter = () => {
    this.setState(
      {
        isModeSearch: false,
        keywordSearch: "",
        currentPage: 1,
      },
      () => {
        this.handleGetListSocialMedia(1);
      }
    );
  };

  _search = ({ name }) => {
    this.setState({ keywordSearch: name, isModeSearch: true }, () => {
      this.handleGetValueSearch(1);
    });
  };

  handleGetValueSearch = (page) => {
    const { searchSocialMedia } = this.props;
    const { keywordSearch } = this.state;
    this.setState({ currentPage: page });
    const payload = { name: keywordSearch, page, limit: 10 };
    searchSocialMedia(payload);
  };

  openModalAddNewAdvertising = () => {
    this.setState({
      titleModal: "Add New Social Media",
      openModal: true,
    });
  };

  handeGetById = (id) => {
    const { getById } = this.props;
    getById(id);
  };

  _actionReview = (item) => {
    this.handeGetById(item.id);
    this.setState({
      openModal: true,
      titleModal: "Review Media Social",
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
    let { itemMediaSocial } = this.state;
    itemMediaSocial[key] = value;
    this.setState({
      itemMediaSocial,
    });
  };

  _hideModal = () => {
    const { updateStateReducer, updateUploadReducer } = this.props;
    this.setState({
      openModal: false,
      isReview: false,
    });
    updateStateReducer({
      itemMediaSocial: {},
    });
    updateUploadReducer({
      link: "",
      messageUpload: "",
      linkContract: "",
    });
  };

  _handleSubmit = (event) => {
    event.preventDefault();
    const { editSocialMedia, addNewSocialMedia, linkThumbnail } = this.props;
    const {
      itemMediaSocial,
      titleModal,
      isModeSearch,
      currentPage,
      keywordSearch,
    } = this.state;
    const arrayKey = ["pointForUserView", "timeForRecvCoin"];
    arrayKey.forEach((element) => {
      if (!itemMediaSocial[element]) {
        itemMediaSocial[element] = 1;
      }
    });
    const payload = {
      ...itemMediaSocial,
      thumbnail: linkThumbnail || itemMediaSocial.thumbnail,
      point: itemMediaSocial.point || 100,
      start: "2020",
      end: "2020",
    };
    if (titleModal === "Add New Social Media") {
      addNewSocialMedia(
        payload,
        this._hideModal,
        currentPage,
        isModeSearch && keywordSearch
      );
    } else {
      editSocialMedia(
        payload,
        this._hideModal,
        currentPage,
        isModeSearch && keywordSearch
      );
    }
  };

  _handleDelete = () => {
    const {
      itemMediaSocial,
      isModeSearch,
      keywordSearch,
      currentPage,
    } = this.state;
    const { deleteSocialMedia } = this.props;
    deleteSocialMedia(
      itemMediaSocial,
      this._hideModal,
      currentPage,
      isModeSearch && keywordSearch
    );
  };

  _actionDelete = (item) => {
    this.handeGetById(item.id);
    this.setState({
      openModal: true,
      titleModal: "Delete Social Media",
    });
  };

  _actionEdit = (item) => {
    this.handeGetById(item.id);
    this.setState({
      openModal: true,
      titleModal: "Edit Social Media",
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
      isModeSearch,
      titleModal,
      isReview,
      itemMediaSocial = {},
    } = this.state;
    const {
      loading,
      listSocialMedia = [],
      loadingGetById,
      messageError,
      loadingAction,
      actionSuccessfully,
      loadingUpload,
      linkThumbnail,
      messageUpload,
      listUser = [],
      total,
    } = this.props;
    const imgThumbnail = linkThumbnail || itemMediaSocial.thumbnail;
    const contentModal = (
      <div style={{ height: "auto", width: "100%" }}>
        {loadingGetById ? (
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
                  value={itemMediaSocial.name || ""}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  id="inputStatus"
                  labelText="Status"
                  onChange={(event) =>
                    this.onChangeFormData("status", event.target.value)
                  }
                  required
                  readOnly={isReview}
                  light={true}
                  placeholder="Status"
                  type="text"
                  value={itemMediaSocial.status || ""}
                />
              </FormGroup>
            </div>

            {titleModal !== "Add New Social Media" && (
              <div className="formData__row">
                <FormGroup legendText="">
                  <TextInput
                    disabled={true}
                    id="inputAuthorId"
                    labelText="Author"
                    required
                    light={true}
                    placeholder="Author"
                    type="text"
                    value={itemMediaSocial.authorId || ""}
                  />
                </FormGroup>
                <FormGroup legendText="">
                  <TextInput
                    id="inputCreatedBy"
                    disabled={true}
                    labelText="Created By"
                    required
                    light={true}
                    placeholder="Created By"
                    type="text"
                    value={itemMediaSocial.createdBy || ""}
                  />
                </FormGroup>
              </div>
            )}
            <div className="formData__row">
              {titleModal === "Add New Social Media" && (
                <FormGroup legendText="">
                  <Select
                    style={{ width: "11rem" }}
                    defaultValue="placeholder-item"
                    id="select-1"
                    invalidText="A valid value is required"
                    labelText="Select Author"
                    onChange={(event) =>
                      this.onChangeFormData("authorId", event.target.value)
                    }
                  >
                    {listUser.map((item) => {
                      return (
                        <SelectItem text={item.userName} value={item.userId} />
                      );
                    })}
                  </Select>
                </FormGroup>
              )}
              <FormGroup legendText="">
                <NumberInput
                  readOnly={isReview || titleModal === "Edit Social Media"}
                  id="point"
                  onChange={(event) =>
                    this.onChangeFormData(
                      "point",
                      event.imaginaryTarget.valueAsNumber
                    )
                  }
                  label="Point"
                  min={titleModal === "Add New Social Media" ? 100 : 0}
                  step={1}
                  value={itemMediaSocial.point || 100}
                />
              </FormGroup>
            </div>
            <div className="formData__row">
              <FormGroup legendText="">
                <NumberInput
                  readOnly={isReview}
                  id="pointForUser"
                  onChange={(event) =>
                    this.onChangeFormData(
                      "pointForUserView",
                      event.imaginaryTarget.valueAsNumber
                    )
                  }
                  invalid={
                    itemMediaSocial.pointForUserView >
                    (itemMediaSocial.point || 100)
                  }
                  invalidText="Point For User View must be less than Point"
                  label="Point For User View"
                  min={1}
                  step={1}
                  value={itemMediaSocial.pointForUserView || 0}
                />
              </FormGroup>
              <FormGroup legendText="">
                <NumberInput
                  readOnly={isReview}
                  id="timeForRecvCoin"
                  onChange={(event) =>
                    this.onChangeFormData(
                      "timeForRecvCoin",
                      event.imaginaryTarget.valueAsNumber
                    )
                  }
                  label="Time For Recv Coin"
                  min={1}
                  step={1}
                  value={itemMediaSocial.timeForRecvCoin || 0}
                />
              </FormGroup>
            </div>
            <div className="formData__row">
              <FormGroup legendText="">
                <NumberInput
                  readOnly={isReview}
                  id="topRank"
                  onChange={(event) =>
                    this.onChangeFormData(
                      "topRank",
                      event.imaginaryTarget.valueAsNumber
                    )
                  }
                  label="Top Rank"
                  min={0}
                  step={1}
                  value={itemMediaSocial.topRank || 0}
                />
              </FormGroup>
              <FormGroup legendText="">
                <NumberInput
                  readOnly={isReview}
                  id="views"
                  onChange={(event) =>
                    this.onChangeFormData(
                      "countView",
                      event.imaginaryTarget.valueAsNumber
                    )
                  }
                  label="Count View"
                  min={0}
                  step={1}
                  value={itemMediaSocial.countView || 0}
                />
              </FormGroup>
            </div>
            <div style={{ width: "9.5rem" }}>
              <FormGroup legendText="">
                <Toggle
                  disabled={isReview}
                  aria-label="toggle button"
                  toggled={(itemMediaSocial && itemMediaSocial.isTop) || false}
                  id="toggle-1"
                  labelA="No"
                  labelB="Yes"
                  labelText="Top Video"
                  onChange={() =>
                    this.onChangeFormData("isTop", !itemMediaSocial.isTop)
                  }
                />
              </FormGroup>
            </div>
            <FormGroup legendText="">
              <TextInput
                id="inputDescription"
                labelText="Description"
                onChange={(event) =>
                  this.onChangeFormData("description", event.target.value)
                }
                required
                readOnly={isReview}
                light={true}
                placeholder="Description"
                type="text"
                value={itemMediaSocial.description || ""}
              />
            </FormGroup>
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
                value={itemMediaSocial.linkTarget || ""}
              />
            </FormGroup>
            <FormGroup legendText="">
              <TextInput
                id="inputVideoURL"
                labelText="Video URL"
                onChange={(event) =>
                  this.onChangeFormData("videoUrl", event.target.value)
                }
                required
                readOnly={isReview}
                light={true}
                placeholder="Video URL"
                type="text"
                value={itemMediaSocial.videoUrl || ""}
              />
            </FormGroup>
            {(titleModal === "Edit Social Media" ||
              titleModal === "Add New Social Media") && (
              <div className="buttonUpload">
                <FileUploader
                  accept={[".jpg", ".png"]}
                  buttonKind="primary"
                  buttonLabel="Upload Thumbnail"
                  labelTitle=""
                  onChange={(e) => this.handleFileChanged(e, true)}
                />
              </div>
            )}
            <div className="viewContract">
              {loadingUpload ? (
                <Loading small description="" withOverlay={false} />
              ) : (
                imgThumbnail && (
                  <Fragment>
                    <div className="titleContract">Image Thumbnail</div>
                    <img
                      className="viewContract__img"
                      src={imgThumbnail}
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
        {loadingGetById
          ? "Loading..."
          : `Are you sure delete ${itemMediaSocial.name}?`}
      </div>
    );

    const renderContentModal =
      titleModal === "Delete Social Media" ? contentDeleteModal : contentModal;

    const headerData = [
      {
        header: "Name",
        key: "name",
      },
      {
        header: "Created",
        key: "created",
      },
      {
        header: "Point",
        key: "point",
      },
      {
        header: "Point For User View",
        key: "pointForUserView",
      },
      {
        header: "Time For Recv Coin",
        key: "timeForRecvCoin",
      },
      {
        header: "Status",
        key: "status",
      },
      { header: "Action", key: "action" },
    ];

    const defaultPoint = itemMediaSocial.point || 100;
    const check =
      titleModal === "Add New Social Media" &&
      itemMediaSocial.pointForUserView > defaultPoint;

    return (
      <Fragment>
        <TitlePage title="Social Media" />
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
            title="List Social Media"
            rowData={listSocialMedia}
            headerData={headerData}
            loading={loading}
            actionReview={this._actionReview}
            actionEdit={this._actionEdit}
            actionDelete={this._actionDelete}
            total={total}
            handlePagination={
              !isModeSearch
                ? this.handleGetListSocialMedia
                : this.handleGetValueSearch
            }
            resetFirstPage={isModeSearch}
          />
        </div>
        <CustomModal
          isReview={isReview || check}
          open={openModal}
          loading={loadingAction}
          contentModal={renderContentModal}
          hideModal={this._hideModal}
          textSubmit={titleModal === "Delete Social Media" ? "Delete" : "Save"}
          onSubmit={
            titleModal !== "Delete Social Media"
              ? this._handleSubmit
              : this._handleDelete
          }
          title={titleModal}
        />

        {!actionSuccessfully && messageError !== "" && (
          <Notification
            status="error"
            message={messageError}
            title={`${titleModal} Failed`}
          />
        )}
        {actionSuccessfully && (
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
  listUser: { listUserData: listUser = [] } = {},
  socialMedia: {
    loading,
    listSocialMedia,
    paging: { total } = {},
    loadingGetById,
    itemMediaSocial,
    messageError,
    loadingAction,
    actionSuccessfully,
  } = {},
  upload: {
    loading: loadingUpload,
    messageUpload,
    linkContract: linkThumbnail,
  } = {},
}) => ({
  loading,
  listSocialMedia,
  total,
  loadingGetById,
  itemMediaSocial,
  messageError,
  loadingAction,
  actionSuccessfully,
  loadingUpload,
  messageUpload,
  linkThumbnail,
  listUser,
});

const mapDispatchToProps = (dispatch) => ({
  uploadImage: (data) =>
    dispatch({ type: UPLOAD.UPLOAD_IMAGE, data: { data } }),
  getListSocialMedia: (data) =>
    dispatch({ type: SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA, data }),
  getById: (id) => dispatch({ type: SOCIAL_MEDIA.GET_BY_ID, data: { id } }),
  updateStateReducer: (data) =>
    dispatch({ type: SOCIAL_MEDIA.SET_STATE_REDUCER, data }),
  deleteSocialMedia: (data, functionHideModal, currentPage, keywordSearch) =>
    dispatch({
      type: SOCIAL_MEDIA.DELETE_SOCIAL_MEDIA,
      data: { data, functionHideModal, currentPage, keywordSearch },
    }),
  addNewSocialMedia: (data, functionHideModal, currentPage, keywordSearch) =>
    dispatch({
      type: SOCIAL_MEDIA.ADD_NEW,
      data: { data, functionHideModal, currentPage, keywordSearch },
    }),
  editSocialMedia: (data, functionHideModal, currentPage, keywordSearch) =>
    dispatch({
      type: SOCIAL_MEDIA.EDIT_SOCIAL_MEDIA,
      data: { data, functionHideModal, currentPage, keywordSearch },
    }),
  searchSocialMedia: (data) =>
    dispatch({
      type: SOCIAL_MEDIA.SEARCH_SOCIAL_MEDIA,
      data,
    }),
  updateUploadReducer: (data) =>
    dispatch({ type: UPLOAD.UPDATE_STATE_UPLOAD_REDUCER, data }),
  getListUser: (data) => dispatch({ type: LIST_USER.GET_LIST_USER, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialMedia);
