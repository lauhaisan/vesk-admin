import React, { Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import TableCommon from "../../components/TableCommon";
import CustomModal from "../../components/CustomModal";
import ButtonLoading from "../../components/ButtonLoading";
import Notification from "../../components/Notification";
import moment from "moment";
import {
  Form,
  FormGroup,
  TextInput,
  DatePicker,
  DatePickerInput,
  Loading,
} from "carbon-components-react";
import { LIST_USER } from "../../constant";
import { connect } from "react-redux";
import "./index.scss";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAdd: false,
      openModal: false,
      titleModal: "",
      isReview: false,
    };
  }

  static getDerivedStateFromProps(props) {
    if ("itemUser" in props) {
      return { itemUser: props.itemUser };
    }
    return null;
  }

  componentDidMount() {
    const { getListUser } = this.props;
    const payload = {};
    getListUser(payload);
  }

  componentWillUnmount() {
    const { updateStateReducer } = this.props;
    updateStateReducer({
      itemUser: {},
      editUserSuccessfully: "",
      messageError: "",
    });
  }

  openModalAddUser = () => {
    this.setState({
      openAdd: true,
      titleModal: "Add New User",
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

  _hideModal = () => {
    const { updateStateReducer } = this.props;
    this.setState({
      openAdd: false,
      openModal: false,
      titleModal: "",
      isReview: false,
    });
    updateStateReducer({
      itemUser: {},
    });
  };

  _handleSubmit = (event) => {
    event.preventDefault();
    const { editUser } = this.props;
    const { itemUser, titleModal } = this.state;
    if (titleModal === "Add New User") {
      // dispatch to saga add new user
      console.log("add new", itemUser);
    } else {
      editUser(itemUser, this._hideModal);
    }
  };

  _handleDelete = () => {
    const { itemUser } = this.props;
    // dispatch to saga delete user
    alert("delete", itemUser.userId);
  };

  _actionDelete = (item) => {
    this.getUserById(item.id);
    this.setState({
      openModal: true,
      titleModal: "Delete User",
      isReview: false,
    });
  };

  _actionEdit = (item) => {
    this.getUserById(item.id);
    this.setState({
      openModal: true,
      titleModal: "Edit User",
      isReview: false,
    });
  };

  render() {
    const { openModal, titleModal, isReview, openAdd, itemUser } = this.state;
    const {
      loading,
      listUserData = [],
      loadingGetUserById,
      loadingEditUser,
      messageError,
      editUserSuccessfully,
    } = this.props;
    const contentModal = (
      <div style={{ height: "auto", width: "100%" }}>
        {loadingGetUserById ? (
          <div className="modalLoading">
            <Loading withOverlay={false} />
          </div>
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
                  disabled={!openAdd}
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
                    labelText="Date picker label"
                    type="text"
                    value={itemUser.birthDate || ""}
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
          <ButtonLoading text="Add New User" onClick={this.openModalAddUser} />
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
          open={openModal || openAdd}
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
}) => ({
  loading,
  listUserData,
  paging,
  messageError,
  loadingGetUserById,
  itemUser,
  loadingEditUser,
  editUserSuccessfully,
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: (data) => dispatch({ type: LIST_USER.GET_USER_BY_ID, data }),
  getListUser: (data) => dispatch({ type: LIST_USER.GET_LIST_USER, data }),
  editUser: (data, functionHideModal) =>
    dispatch({ type: LIST_USER.EDIT_USER, data: { data, functionHideModal } }),
  updateStateReducer: (data) =>
    dispatch({ type: LIST_USER.SET_STATE_REDUCER, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
