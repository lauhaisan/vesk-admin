import React, { Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import TableCommon from "../../components/TableCommon";
import CustomModal from "../../components/CustomModal";
import Notification from "../../components/Notification";
import Filter from "./component/Filter";
import numeral from "numeral";
import ExchangeRate from "./component/ExchangeRate";
import moment from "moment";
import {
  Form,
  FormGroup,
  TextInput,
  DatePicker,
  DatePickerInput,
  Loading,
  Accordion,
  AccordionItem,
  NumberInput,
  FileUploader,
} from "carbon-components-react";
import { LIST_USER, EXCHANGE, UPLOAD } from "../../constant";
import { connect } from "react-redux";
import "./index.scss";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalExchange: false,
      openModal: false,
      titleModal: "",
      isReview: false,
      coint: 0,
      point: 0,
      messageExchange: "",
      fileUpload: null,
    };
  }

  static getDerivedStateFromProps(props) {
    if ("itemUser" in props) {
      return { itemUser: props.itemUser };
    }
    return null;
  }

  componentDidMount() {
    this.handleGetListUser({});
  }

  componentWillUnmount() {
    const { updateStateReducer, updateExchangeReducer } = this.props;
    updateStateReducer({
      itemUser: {},
      editUserSuccessfully: "",
      messageError: "",
    });
    updateExchangeReducer({
      isCreateExchangeSuccessfully: "",
    });
  }

  handleGetListUser = (payload) => {
    const { getListUser } = this.props;
    getListUser(payload);
  };

  _resetFilter = () => {
    this.handleGetListUser({});
  };

  _search = (value) => {
    const { searchListUser } = this.props;
    searchListUser(value);
  };

  openModalAddUser = () => {
    this.setState({
      titleModal: "Add New User",
      openModal: true,
    });
  };

  getUserById = (id) => {
    const { getUserInfo } = this.props;
    getUserInfo({ data: id });
  };

  _actionReview = (item) => {
    this.getUserById(item.id);
    this.setState({
      openModal: true,
      titleModal: "Review User",
      isReview: true,
    });
  };

  onChangeDatePicker = (e) => {
    const value = e.target ? e.target.value : e[0];
    const valueDate = moment(value).format("DD/MM/YYYY");
    let { itemUser } = this.state;
    itemUser.birthDate = valueDate;
    this.setState({
      itemUser,
    });
  };

  onChangeFormData = (key, value) => {
    let { itemUser } = this.state;
    itemUser[key] = value;
    this.setState({
      itemUser,
    });
  };

  onChangeFormExchange = (key, value) => {
    const { rate } = this.props;
    const formatRate = numeral(rate).format("0.[00]");
    this.setState({
      [key]: value,
    });
    if (key === "coint") {
      this.setState({
        point: numeral(formatRate * value).format("0.[00]"),
      });
    }
  };

  _hideModal = () => {
    const { updateStateReducer, updateUploadReducer } = this.props;
    this.setState({
      openModalExchange: false,
      openModal: false,
      isReview: false,
      coint: 0,
      point: 0,
      messageExchange: "",
    });
    updateStateReducer({
      itemUser: {},
    });
    updateUploadReducer({
      link: "",
      messageUpload: "",
      linkContract: "",
    });
  };

  _handleSubmitExchange = (event) => {
    event.preventDefault();
    const { createExchange, linkContract } = this.props;
    const {
      itemUser: { userId = "" } = {},
      coint: coin,
      point,
      messageExchange,
    } = this.state;
    const value = {
      userId,
      point,
      coin,
      message: messageExchange,
      contract: linkContract,
    };
    createExchange(value, this._hideModal);
  };

  _handleSubmit = (event) => {
    event.preventDefault();
    const { editUser, link } = this.props;
    const { itemUser, titleModal } = this.state;
    const payload = {
      ...itemUser,
      avatar: link || itemUser.avatar,
    };
    if (titleModal === "Add New User") {
    } else {
      editUser(payload, this._hideModal);
    }
  };

  _actionEdit = (item) => {
    this.getUserById(item.id);
    this.setState({
      openModal: true,
      titleModal: "Edit User",
    });
  };

  _actionExchange = (item) => {
    this.getUserById(item.id);
    this.setState({
      openModalExchange: true,
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
      itemUser = {},
      openModalExchange,
      coint,
      point,
      messageExchange,
    } = this.state;
    const {
      loading,
      listUserData = [],
      loadingGetUserById,
      loadingEditUser,
      messageError,
      editUserSuccessfully,
      loadingCreateExchange,
      isCreateExchangeSuccessfully,
      messageCreateExchange,
      loadingUpload,
      link,
      messageUpload,
      linkContract,
      rate,
    } = this.props;
    const formatRate = numeral(rate).format("0.[00]");

    const linkAvatar =
      link || itemUser.avatar || require("../../images/testAvatar.jpg");
    const imgContract = linkContract || itemUser.contract;
    const contentModal = (
      <div style={{ height: "auto", width: "100%" }}>
        {loadingGetUserById ? (
          <div className="modalLoading">
            <Loading withOverlay={false} />
          </div>
        ) : (
          <Form className="formData">
            <div className="formData__avt">
              {loadingUpload ? (
                <div
                  className="formData__avt--img"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Loading small description="" withOverlay={false} />
                </div>
              ) : (
                <img
                  className="formData__avt--img"
                  src={linkAvatar}
                  alt="img-avatar"
                />
              )}
              {(titleModal === "Edit User" ||
                titleModal === "Add New User") && (
                <div className="customButtonUpload">
                  <FileUploader
                    accept={[".jpg", ".png"]}
                    buttonKind="primary"
                    buttonLabel={<i className="fas fa-edit iconEdit"></i>}
                    labelTitle=""
                    onChange={(e) => this.handleFileChanged(e, false)}
                  />
                </div>
              )}
            </div>
            <div className="formData__row">
              <FormGroup legendText="">
                <TextInput
                  disabled={titleModal !== "Add New User"}
                  id="inputEmail"
                  labelText="Email"
                  onChange={(event) =>
                    this.onChangeFormData("email", event.target.value)
                  }
                  required
                  light={true}
                  placeholder="Email"
                  type="text"
                  value={itemUser.email || ""}
                />
              </FormGroup>
              <FormGroup legendText="">
                <DatePicker
                  dateFormat="d/m/Y"
                  datePickerType="single"
                  onChange={(e) => this.onChangeDatePicker(e)}
                >
                  <DatePickerInput
                    disabled={isReview}
                    id="date-picker-calendar-id"
                    placeholder="Birthday"
                    labelText="Birthday"
                    type="text"
                    value={itemUser.birthDate || ""}
                  />
                </DatePicker>
              </FormGroup>
            </div>
            <div className="formData__row">
              <FormGroup legendText="">
                <TextInput
                  className="formData__row__input"
                  id="inputFirstName"
                  labelText="First Name"
                  onChange={(event) =>
                    this.onChangeFormData("firstName", event.target.value)
                  }
                  required
                  light={true}
                  placeholder="First Name"
                  type="text"
                  readOnly={isReview}
                  value={itemUser.firstName || ""}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  // disabled={true}
                  className="formData__row__input"
                  id="inputLastName"
                  labelText="Last Name"
                  onChange={(event) =>
                    this.onChangeFormData("lastName", event.target.value)
                  }
                  required
                  light={true}
                  placeholder="Last Name"
                  type="text"
                  readOnly={isReview}
                  value={itemUser.lastName || ""}
                />
              </FormGroup>
            </div>
            <div className="formData__row">
              <FormGroup legendText="">
                <TextInput
                  // disabled={true}
                  className="formData__row__input"
                  id="inputUserName"
                  labelText="User Name"
                  onChange={(event) =>
                    this.onChangeFormData("userName", event.target.value)
                  }
                  required
                  light={true}
                  placeholder="User Name"
                  type="text"
                  readOnly={isReview}
                  value={itemUser.userName || ""}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  // disabled={true}
                  className="formData__row__input"
                  id="inputGender"
                  labelText="Gender"
                  onChange={(event) =>
                    this.onChangeFormData("gender", event.target.value)
                  }
                  required
                  light={true}
                  placeholder="Gender"
                  type="text"
                  readOnly={isReview}
                  value={itemUser.gender || ""}
                />
              </FormGroup>
            </div>
            <div className="formData__row">
              <FormGroup legendText="">
                <TextInput
                  // disabled={true}
                  className="formData__row__input"
                  id="inputRegion"
                  labelText="Region"
                  onChange={(event) =>
                    this.onChangeFormData("region", event.target.value)
                  }
                  required
                  light={true}
                  placeholder="Region"
                  type="text"
                  readOnly={isReview}
                  value={itemUser.region || ""}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  // disabled={true}
                  className="formData__row__input"
                  id="inputCity"
                  labelText="City"
                  onChange={(event) =>
                    this.onChangeFormData("city", event.target.value)
                  }
                  required
                  light={true}
                  placeholder="City"
                  type="text"
                  readOnly={isReview}
                  value={itemUser.city || ""}
                />
              </FormGroup>
            </div>
            <div className="formData__row">
              <FormGroup legendText="">
                <TextInput
                  // disabled={true}
                  className="formData__row__input"
                  id="inputAddress"
                  labelText="Address"
                  onChange={(event) =>
                    this.onChangeFormData("address", event.target.value)
                  }
                  required
                  light={true}
                  placeholder="Address"
                  type="text"
                  readOnly={isReview}
                  value={itemUser.address || ""}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  // disabled={true}
                  className="formData__row__input"
                  id="inputPhone"
                  labelText="Phone"
                  onChange={(event) =>
                    this.onChangeFormData("phone", event.target.value)
                  }
                  required
                  light={true}
                  placeholder="Phone"
                  type="text"
                  readOnly={isReview}
                  value={itemUser.phone || ""}
                />
              </FormGroup>
            </div>
          </Form>
        )}
      </div>
    );

    const contentDeleteModal = (
      <div style={{ height: "auto", width: "100%" }}>
        {loadingGetUserById
          ? "Loading..."
          : `Are you sure delete userID: ${itemUser.userId}?`}
      </div>
    );

    const contentModalExChange = (
      <div style={{ height: "auto", width: "100%" }}>
        {loadingGetUserById ? (
          <div className="modalLoading">
            <Loading withOverlay={false} />
          </div>
        ) : (
          <Form className="formData">
            <div style={{ color: "#525252" }}>
              User Name: {itemUser.userName}
            </div>
            <div style={{ color: "#525252", marginBottom: "0.5rem" }}>
              Email: {itemUser.email}
            </div>
            <div className="formData__row">
              <FormGroup legendText="">
                <NumberInput
                  id="inputCoint"
                  onChange={(event) =>
                    this.onChangeFormExchange(
                      "coint",
                      event.imaginaryTarget.valueAsNumber
                    )
                  }
                  label="Coin"
                  min={0}
                  step={1}
                  value={coint || 0}
                />
              </FormGroup>
              <div className="viewExchangeRate"> x {formatRate} =</div>
              <FormGroup legendText="">
                <NumberInput
                  id="inputPoint"
                  readOnly={true}
                  // onChange={(event) =>
                  //   this.onChangeFormExchange(
                  //     "point",
                  //     event.imaginaryTarget.valueAsNumber
                  //   )
                  // }
                  label="Point"
                  min={0}
                  step={1}
                  value={point || 0}
                />
              </FormGroup>
            </div>
            <FormGroup legendText="">
              <TextInput
                className="formData__row__input"
                id="inputMessage"
                labelText="Message"
                onChange={(event) =>
                  this.onChangeFormExchange(
                    "messageExchange",
                    event.target.value
                  )
                }
                required
                light={true}
                placeholder="Message"
                type="text"
                value={messageExchange}
              />
            </FormGroup>
            <div className="buttonUpload">
              <FileUploader
                accept={[".jpg", ".png"]}
                buttonKind="primary"
                buttonLabel="Upload Contract"
                labelTitle=""
                onChange={(e) => this.handleFileChanged(e, true)}
              />
            </div>
            <div className="viewContract">
              {loadingUpload ? (
                <Loading small description="" withOverlay={false} />
              ) : (
                imgContract && (
                  <img
                    className="viewContract__img"
                    src={imgContract}
                    alt="img-contract"
                  />
                )
              )}
            </div>
          </Form>
        )}
      </div>
    );

    const renderContentModal =
      titleModal === "Delete User" ? contentDeleteModal : contentModal;

    const headerData = [
      {
        header: "Email",
        key: "email",
      },
      {
        header: "First Name",
        key: "firstName",
      },
      {
        header: "Last Name",
        key: "lastName",
      },
      {
        header: "User Name",
        key: "userName",
      },
      { header: "Action", key: "action" },
    ];

    const formatData = listUserData.map((item) => {
      return {
        ...item,
        id: item.userId,
      };
    });

    return (
      <Fragment>
        <TitlePage title="Users" />
        <div className="containerUserPage">
          <Accordion className="viewFilter">
            <AccordionItem
              open
              title={<div className="viewFilter__title">Exchange Rate</div>}
            >
              <ExchangeRate />
            </AccordionItem>
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
            title="List User"
            rowData={formatData}
            headerData={headerData}
            loading={loading}
            actionReview={this._actionReview}
            actionEdit={this._actionEdit}
            actionExchange={this._actionExchange}
          />
        </div>
        <CustomModal
          isReview={isReview}
          open={openModal}
          loading={loadingEditUser}
          contentModal={renderContentModal}
          hideModal={this._hideModal}
          textSubmit={titleModal === "Delete User" ? "Delete" : "Save"}
          onSubmit={
            titleModal !== "Delete User"
              ? this._handleSubmit
              : this._handleDelete
          }
          title={titleModal}
        />
        <CustomModal
          open={openModalExchange}
          loading={loadingCreateExchange}
          contentModal={contentModalExChange}
          hideModal={this._hideModal}
          textSubmit="Save"
          onSubmit={this._handleSubmitExchange}
          title="Exchange"
        />

        {!editUserSuccessfully && messageError !== "" && (
          <Notification
            status="error"
            message={messageError}
            title="Edit User Failed"
          />
        )}
        {editUserSuccessfully && (
          <Notification status="success" title="Edit User Successfully" />
        )}
        {!isCreateExchangeSuccessfully && messageCreateExchange !== "" && (
          <Notification
            status="error"
            message={messageError}
            title="Exchange Failed"
          />
        )}
        {isCreateExchangeSuccessfully && (
          <Notification status="success" title="Exchange Successfully" />
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
  listUser: {
    loading,
    listUserData,
    paging,
    messageError,
    loadingGetUserById,
    itemUser,
    loadingEditUser,
    editUserSuccessfully,
  } = {},
  exchange: {
    loading: loadingCreateExchange,
    isCreateExchangeSuccessfully,
    messageCreateExchange,
    exchangeRate: { rate = 0 } = {},
  } = {},
  upload: { loading: loadingUpload, link, messageUpload, linkContract } = {},
}) => ({
  loading,
  listUserData,
  paging,
  messageError,
  loadingGetUserById,
  itemUser,
  loadingEditUser,
  editUserSuccessfully,
  loadingCreateExchange,
  isCreateExchangeSuccessfully,
  messageCreateExchange,
  loadingUpload,
  link,
  messageUpload,
  linkContract,
  rate,
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: (data) => dispatch({ type: LIST_USER.GET_USER_BY_ID, data }),
  getListUser: (data) => dispatch({ type: LIST_USER.GET_LIST_USER, data }),
  editUser: (data, functionHideModal) =>
    dispatch({ type: LIST_USER.EDIT_USER, data: { data, functionHideModal } }),
  createExchange: (data, functionHideModal) =>
    dispatch({
      type: EXCHANGE.CREATE_EXCHANGE,
      data: { data, functionHideModal },
    }),
  updateStateReducer: (data) =>
    dispatch({ type: LIST_USER.SET_STATE_REDUCER, data }),
  uploadImage: (data) =>
    dispatch({ type: UPLOAD.UPLOAD_IMAGE, data: { data } }),
  updateUploadReducer: (data) =>
    dispatch({ type: UPLOAD.UPDATE_STATE_UPLOAD_REDUCER, data }),
  searchListUser: (data) => dispatch({ type: LIST_USER.SEARCH_USER, data }),
  updateExchangeReducer: (data) =>
    dispatch({ type: EXCHANGE.UPDATE_EXCHANGE_REDUCER, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
