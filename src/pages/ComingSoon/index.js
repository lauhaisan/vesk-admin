import React, { Component } from "react";
import TitlePage from "../../components/TitlePage";

class ComingSoon extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TitlePage title="Coming Soon..." />
        <img
          src={require("../../images/comingSoon.gif")}
          alt="404"
          width="50%"
          height="auto"
        />
      </div>
    );
  }
}

export default ComingSoon;
