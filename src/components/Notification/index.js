import React, { Component } from "react";
import { ToastNotification } from "carbon-components-react";

class Notification extends Component {
  render() {
    const {
      title = "",
      status = "error",
      timeout = 0,
      message = "",
      caption = false,
    } = this.props;
    return (
      <div style={{ position: "absolute", top: "20px", right: "10px" }}>
        <ToastNotification
          kind={status}
          caption={caption}
          subtitle={<span>{message}</span>}
          timeout={timeout}
          title={title}
        />
      </div>
    );
  }
}

export default Notification;
