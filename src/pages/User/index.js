import React, { Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import TableCommon from "../../components/TableCommon";
import CustomModal from "../../components/CustomModal";
import { Form, FormGroup, TextInput } from "carbon-components-react";
import { LIST_USER } from "../../constant";
import { connect } from "react-redux";
import "./index.scss";
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      titleModal: "",
      userSelected: {},
      isReview: "",
    };
  }

  componentDidMount() {
    const { getListUser } = this.props;
    const payload = {};
    getListUser(payload);
  }

  getUserById = (id) => {
    const { getUserInfo } = this.props;
    getUserInfo({ data: id });
  };

  _actionReview = (item) => {
    this.getUserById(item.id);
    this.setState({
      openModal: true,
      titleModal: "Review User",
      userSelected: item,
      isReview: true,
    });
  };

  _hideModal = () => {
    const { updateStateReducer } = this.props;
    this.setState({
      openModal: false,
      userSelected: {},
      titleModal: "",
      isReview: "",
    });
    updateStateReducer({ itemUser: {} });
  };

  _handleSubmit = () => {
    // const { userSelected } = this.state;
    // alert(userSelected.id);
    //After dispatch API => this._hideModal
    alert("submit form");
  };

  _actionDelete = (item) => {
    this.setState({
      openModal: true,
      titleModal: "Delete User",
      userSelected: item,
      isReview: false,
    });
  };

  _actionEdit = (item) => {
    this.setState({
      openModal: true,
      titleModal: "Edit User",
      userSelected: item,
      isReview: false,
    });
  };

  render() {
    const { userSelected, openModal, titleModal, isReview } = this.state;
    const {
      loading,
      listUserData = [],
      itemUser,
      loadingGetUserById,
    } = this.props;
    const contentModal = (
      <div style={{ height: "250px", width: "100%" }}>
        {loadingGetUserById ? (
          "Loading..."
        ) : (
          <Form>
            <FormGroup legendText="">
              <TextInput
                disabled={false}
                // invalid={validationEmail}
                id="inputEmail"
                // invalidText={messageValidationEmail}
                labelText="Email"
                required
                light={true}
                // onChange={(event) => this.handleChangeEmail(event.target.value)}
                placeholder="Email"
                type="text"
                value={itemUser.email}
              />
            </FormGroup>
          </Form>
        )}
      </div>
    );

    const contentDeleteModal = (
      <div style={{ height: "auto", width: "100%" }}>
        Are you sure delete userID:{userSelected.id}?
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
          onSubmit={this._handleSubmit}
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
    itemUser,
  } = {},
}) => ({
  loading,
  listUserData,
  paging,
  messageError,
  loadingGetUserById,
  itemUser,
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: (data) => dispatch({ type: LIST_USER.GET_USER_BY_ID, data }),
  getListUser: (data) => dispatch({ type: LIST_USER.GET_LIST_USER, data }),
  updateStateReducer: (data) =>
    dispatch({ type: LIST_USER.SET_STATE_REDUCER, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
