import React, { Component } from "react";
import { Form, FormGroup, TextInput } from "carbon-components-react";
import { Login32, Reply32 } from "@carbon/icons-react";
import TitlePage from "../../components/TitlePage";
import ButtonLoading from "../../components/ButtonLoading";
import ButtonOutline from "../../components/ButtonOutline";
import "./index.scss";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      check: false,
      loading: false,
      validationEmail: false,
    };
  }

  handleChangeEmail = (value) => {
    this.setState({ email: value.toLowerCase() });
  };

  selectTagSignIn = (history) => {
    history.push("/signin");
  };

  handleSubmit = (event) => {
    const { email } = this.state;
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
    if (!check) {
      const valueForgotPassword = { email };
      console.log("values", valueForgotPassword);
    }
  };

  render() {
    const {
      validationEmail,
      messageValidationEmail,
      loading,
      email,
    } = this.state;
    const { history } = this.props;

    return (
      <div className="content-forgot-psw" style={{ height: "auto" }}>
        <TitlePage title="Forgot Password" />

        <div className="viewTitleForgot">Forgot Password</div>
        <div className="content-form">
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
                onChange={(event) => this.handleChangeEmail(event.target.value)}
                placeholder="Email"
                type="text"
                value={email}
              />
            </FormGroup>

            <div className="viewBtn">
              <ButtonLoading
                onClick={this.handleSubmit}
                disabled={false}
                loading={loading || undefined}
                type="submit"
                text="Send"
                renderIcon={Login32}
                style={{
                  marginTop: "10px",
                }}
              />

              <ButtonOutline
                onClick={() => this.selectTagSignIn(history)}
                disabled={false}
                renderIcon={Reply32}
                text="Back"
                style={{ marginTop: "10px" }}
              />
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
export default ForgotPassword;
