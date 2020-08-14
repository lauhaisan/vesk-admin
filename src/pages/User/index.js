import React, { Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import TableCommon from "../../components/TableCommon";
import CustomModal from "../../components/CustomModal";
import {
  Form,
  FormGroup,
  TextInput,
  DatePicker,
  DatePickerInput
} from "carbon-components-react";
import { LIST_USER } from "../../constant";
import { connect } from "react-redux";
import "./index.scss";
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      titleModal: "",
      isReview: "",
      formData: {
        email: "",
        firstName: "",
        lastName: "",
        userName: "",
        gender: "",
        region: "",
        city: "",
        address: "",
        phone: ""
      }
    };
  }

  componentDidMount() {
    const { getListUser } = this.props;
    const payload = {};
    getListUser(payload);
  }

  getUserById = id => {
    const { getUserInfo } = this.props;
    getUserInfo({ data: id });
  };

  _actionReview = item => {
    this.getUserById(item.id);
    this.setState({
      openModal: true,
      titleModal: "Review User",
      isReview: true
    });
  };

  _hideModal = () => {
    const { updateStateReducer } = this.props;
    this.setState({
      openModal: false,
      titleModal: "",
      isReview: "",
      formData: {
        address: "",
        city: "",
        email: "",
        firstName: "",
        gender: "",
        lastName: "",
        phone: "",
        region: "",
        userName: ""
      }
    });
    updateStateReducer({ itemUser: {} });
  };

  _handleSubmit = () => {
    //After dispatch API => this._hideModal
    alert("submit form");
  };

  _handleDelete = () => {
    const { itemUser } = this.props;
    alert("delete", itemUser.userId);
  };

  _actionDelete = item => {
    this.getUserById(item.id);
    this.setState({
      openModal: true,
      titleModal: "Delete User",
      isReview: false
    });
  };

  _actionEdit = item => {
    this.getUserById(item.id);
    this.setState({
      openModal: true,
      titleModal: "Edit User",
      isReview: false
    });
  };

  render() {
    const { openModal, titleModal, isReview, formData } = this.state;
    const {
      loading,
      listUserData = [],
      itemUser = {},
      loadingGetUserById
    } = this.props;
    const contentModal = (
      <div style={{ height: "auto", width: "100%" }}>
        {loadingGetUserById ? (
          "Loading..."
        ) : (
          <Form className="formData">
            <div className="formData__avt">
              <img
                className="formData__avt--img"
                src={require("../../images/testAvatar.jpg")}
                alt="img-avatar"
              />
            </div>
            <div className="formData__row">
              <FormGroup legendText="">
                <TextInput
                  disabled={true}
                  id="inputEmail"
                  labelText="Email"
                  required
                  light={true}
                  placeholder="Email"
                  type="text"
                  value={itemUser.email || formData.email}
                />
              </FormGroup>
              <FormGroup legendText="">
                <DatePicker dateFormat="d/m/Y" datePickerType="single">
                  <DatePickerInput
                    id="date-picker-calendar-id"
                    placeholder="Birthday"
                    labelText="Date picker label"
                    type="text"
                    value={itemUser.birthDate || formData.birthDate}
                  />
                </DatePicker>
              </FormGroup>
            </div>
            <div className="formData__row">
              <FormGroup legendText="">
                <TextInput
                  // disabled={true}
                  className="formData__row__input"
                  id="inputFirstName"
                  labelText="First Name"
                  required
                  light={true}
                  placeholder="First Name"
                  type="text"
                  readOnly={isReview}
                  value={itemUser.firstName || formData.firstName}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  // disabled={true}
                  className="formData__row__input"
                  id="inputLastName"
                  labelText="Last Name"
                  required
                  light={true}
                  placeholder="Last Name"
                  type="text"
                  readOnly={isReview}
                  value={itemUser.lastName || formData.lastName}
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
                  required
                  light={true}
                  placeholder="User Name"
                  type="text"
                  readOnly={isReview}
                  value={itemUser.userName || formData.userName}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  // disabled={true}
                  className="formData__row__input"
                  id="inputGender"
                  labelText="Gender"
                  required
                  light={true}
                  placeholder="Gender"
                  type="text"
                  readOnly={isReview}
                  value={itemUser.gender || formData.gender}
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
                  required
                  light={true}
                  placeholder="Region"
                  type="text"
                  readOnly={isReview}
                  value={itemUser.region || formData.region}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  // disabled={true}
                  className="formData__row__input"
                  id="inputCity"
                  labelText="City"
                  required
                  light={true}
                  placeholder="City"
                  type="text"
                  readOnly={isReview}
                  value={itemUser.city || formData.city}
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
                  required
                  light={true}
                  placeholder="Address"
                  type="text"
                  readOnly={isReview}
                  value={itemUser.address || formData.address}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  // disabled={true}
                  className="formData__row__input"
                  id="inputPhone"
                  labelText="Phone"
                  required
                  light={true}
                  placeholder="Phone"
                  type="text"
                  readOnly={isReview}
                  value={itemUser.phone || formData.phone}
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

    const renderContentModal =
      titleModal === "Delete User" ? contentDeleteModal : contentModal;

    const headerData = [
      {
        header: "Email",
        key: "email"
      },
      {
        header: "First Name",
        key: "firstName"
      },
      {
        header: "Last Name",
        key: "lastName"
      },
      {
        header: "User Name",
        key: "userName"
      },
      { header: "Action", key: "action" }
    ];

    const formatData = listUserData.map(item => {
      return {
        ...item,
        id: item.userId
      };
    });

    return (
      <Fragment>
        <TitlePage title="Users" />
        <div className="containerUserPage">
          <TableCommon
            title="Table"
            rowData={formatData}
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
          // loading={loading}
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
    itemUser
  } = {}
}) => ({
  loading,
  listUserData,
  paging,
  messageError,
  loadingGetUserById,
  itemUser
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: data => dispatch({ type: LIST_USER.GET_USER_BY_ID, data }),
  getListUser: data => dispatch({ type: LIST_USER.GET_LIST_USER, data }),
  updateStateReducer: data =>
    dispatch({ type: LIST_USER.SET_STATE_REDUCER, data })
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
