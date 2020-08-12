import React, { Component } from "react";
import { Button } from "carbon-components-react";
import "./index.scss";

class ButtonOutline extends Component {
  onClick = () => {
    const { onClick } = this.props;
    onClick();
  };
  render() {
    const { text = "", disabled, onClick } = this.props;
    return (
      <div className="btnOutline">
        <Button
          kind="tertiary"
          className="bx--btn--primary"
          disabled={disabled}
          onClick={() => onClick()}
          {...this.props}
        >
          {text}
        </Button>
      </div>
    );
  }
}

export default ButtonOutline;
