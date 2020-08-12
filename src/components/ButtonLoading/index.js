import React, { Component } from "react";
import { Button, InlineLoading } from "carbon-components-react";
import "./index.scss";

class ButtonLoading extends Component {
  render() {
    const { text = "", loading, disabled, onClick } = this.props;
    return (
      <div className="btnLoading">
        <Button
          kind="primary"
          className="bx--btn--primary"
          disabled={disabled}
          onClick={() => onClick()}
          {...this.props}
        >
          {text} {loading && <InlineLoading />}
        </Button>
      </div>
    );
  }
}

export default ButtonLoading;
