import React, { Component } from "react";
import TitlePage from "../../components/TitlePage";

class Contact extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#fff", width: "76%", height: "200vh" }}>
        <TitlePage title="Contact" />
        <h1>This is contact page height 200vh</h1>
      </div>
    );
  }
}

export default Contact;
