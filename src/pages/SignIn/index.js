import React, { Component, Fragment } from "react";
import { Form, FormGroup, TextInput } from "carbon-components-react";
import { Login32 } from "@carbon/icons-react";
import ButtonLoading from "../../components/ButtonLoading";
import Notification from "../../components/Notification";
import TitlePage from "../../components/TitlePage";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./index.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      check: false,
      validationEmail: false,
      validationPassword: false,
    };
  }

  componentWillUnmount() {
    const { updateStateReducer } = this.props;
    updateStateReducer({
      messageSignIn: "",
    });
  }

  handleChangePwd = (value) => {
    this.setState({ password: value });
  };

  handleChangeEmail = (value) => {
    this.setState({ email: value.toLowerCase() });
  };

  handleSubmit = (event) => {
    const { email, password } = this.state;
    const { signIn, history } = this.props;
    event.preventDefault();
    let check = false;
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegex.test(email) === false) {
      this.setState({
        validationEmail: true,
        messageValidationEmail: "The email is not valid",
      });
      check = true;
    } else {
      this.setState({
        validationEmail: false,
        messageValidationEmail: "",
      });
    }
    if (password.length < 8) {
      this.setState({
        validationPassword: true,
        messageValidationPwd: "Password must be at least 8 characters",
      });
      check = true;
    } else {
      this.setState({
        validationPassword: false,
        messageValidationPwd: "",
      });
    }
    this.setState({
      check,
    });
    if (!check) {
      const valueLogin = { name:email, password };
      signIn(valueLogin, history);
    }
  };

  render() {
    const {
      validationEmail,
      messageValidationEmail,
      validationPassword,
      messageValidationPwd,
      email,
      password,
      check,
    } = this.state;
    const { loading, isSignInSuccessfully, messageSignIn } = this.props;

    return (
      <Fragment>
        <TitlePage title="Sign In" />

        <div
          className="content-signIn"
          style={{ height: check ? "525px" : "490px" }}
        >
          <div className="viewTitleSignIn">SIGN IN</div>
          <img
            className="viewImage"
            src={require("../../images/login.png")}
            alt="img-login"
          />
          <div className="form">
            <Form onSubmit={this.handleSubmit}>
              <FormGroup legendText="">
                <TextInput
                  disabled={false}
                  invalid={validationEmail}
                  id="inputEmail"
                  invalidText={messageValidationEmail}
                  labelText="Email"
                  required
                  light={true}
                  onChange={(event) =>
                    this.handleChangeEmail(event.target.value)
                  }
                  placeholder="Email"
                  type="text"
                  value={email}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  disabled={false}
                  id="inputPwd"
                  invalid={validationPassword}
                  invalidText={messageValidationPwd}
                  labelText="Password"
                  placeholder="Password"
                  light={true}
                  onChange={(event) => this.handleChangePwd(event.target.value)}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  required
                  type="password"
                  value={password}
                />
              </FormGroup>
            </Form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ButtonLoading
                onClick={this.handleSubmit}
                disabled={loading}
                loading={loading ? "yes" : undefined}
                type="submit"
                text="Sign In"
                renderIcon={Login32}
                style={{
                  margin: "10px 0",
                  width: "140px",
                  height: "47px",
                }}
              />
              <Link to="/signup">Create new account?</Link>
            </div>
          </div>
          <div className="viewForgotPWD">
            <Link to="/forgot-password"> Forgot Password?</Link>
          </div>
        </div>
        {!isSignInSuccessfully && messageSignIn !== "" && (
          <Notification
            status="error"
            message={messageSignIn}
            title="Sign Up Failed"
          />
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = ({
  user: { loading, isSignInSuccessfully = "", messageSignIn = "" } = {},
}) => ({
  loading,
  isSignInSuccessfully,
  messageSignIn,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (data, history) => dispatch({ type: "USER_SIGNIN", data: { data, history } }),
  updateStateReducer: (data) => dispatch({ type: "UPDATE_STATE", data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
