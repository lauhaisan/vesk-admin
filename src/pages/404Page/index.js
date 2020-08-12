import React, { Component } from "react";
import TitlePage from "../../components/TitlePage";

class NotFoundPage extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          width: "76%",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TitlePage title="404 Page Not Found" />
        <h1>Not Found</h1>
        <img
          src="https://static.mediacdn.vn/images/4041.gif"
          alt="404"
          width="100%"
          height="auto"
        />
      </div>
    );
  }
}

export default NotFoundPage;
