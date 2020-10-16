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
      phone: "",
    };
  }

  onChangeFormData = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleSearch = (event) => {
    event.preventDefault();
    const { search } = this.props;
    const { email, phone } = this.state;
    const value = { email, phone };
    search(value);
  };

  handleReset = () => {
    const { resetFilter } = this.props;
    this.setState({
      email: "",
      phone: "",
    });
    resetFilter();
  };

  render() {
    const { email, phone } = this.state;
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
              onChange={(event) =>
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
              id="inputSearchPhone"
              labelText="Phone"
              required
              light={true}
              onChange={(event) =>
                this.onChangeFormData("phone", event.target.value)
              }
              placeholder="Phone"
              type="text"
              value={phone}
            />
          </FormGroup>
        </Form>

        <div className="viewBtn">
          <ButtonOutline text="Reset Filter" onClick={this.handleReset} />
          <ButtonLoading
            disabled={!email && !phone}
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
