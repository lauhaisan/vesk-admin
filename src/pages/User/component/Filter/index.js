import React, { Component } from "react";
import { Form, FormGroup, TextInput } from "carbon-components-react";
import { Search32 } from "@carbon/icons-react";
import ButtonLoading from "../../../../components/ButtonLoading";
import ButtonOutline from "../../../../components/ButtonOutline";
import "./index.scss";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: ""
    };
  }

  onChangeFormData = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  handleSearch = event => {
    event.preventDefault();
    const { search } = this.props;
    const { email, userName } = this.state;
    const value = { email, userName };
    search(value);
  };

  handleReset = () => {
    const { resetFilter } = this.props;
    this.setState({
      email: "",
      userName: ""
    });
    resetFilter();
  };

  render() {
    const { email, userName } = this.state;
    return (
      <div className="containerFilter">
        <Form className="bx--row">
          <FormGroup legendText="" className="bx--col-md-2 bx--col-sm-4">
            <TextInput
              className="itemForm"
              disabled={false}
              id="inputSearchEmail"
              labelText="Email"
              required
              light={true}
              onChange={event =>
                this.onChangeFormData("email", event.target.value)
              }
              placeholder="Email"
              type="text"
              value={email}
            />
          </FormGroup>
          <FormGroup legendText="" className="bx--col-md-2 bx--col-sm-4">
            <TextInput
              className="itemForm"
              disabled={false}
              id="inputSearchUserName"
              labelText="User Name"
              required
              light={true}
              onChange={event =>
                this.onChangeFormData("userName", event.target.value)
              }
              placeholder="User Name"
              type="text"
              value={userName}
            />
          </FormGroup>
        </Form>

        <div className="viewBtn">
          <ButtonOutline text="Reset Filter" onClick={this.handleReset} />
          <ButtonLoading
            disabled={!email && !userName}
            text="Search"
            renderIcon={Search32}
            onClick={this.handleSearch}
            style={{ marginLeft: "1rem" }}
          />
        </div>
      </div>
    );
  }
}

export default Filter;
