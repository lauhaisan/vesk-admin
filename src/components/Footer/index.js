import React, { Component } from "react";
// import "./styles.scss";

class Footer extends Component {
  render() {
    return (
      <footer
        style={{
          backgroundColor: "#e9ecef",
          height: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div style={{ color: "#888" }}>
          <p>© 2020 Vesk</p>
        </div>
      </footer>
    );
  }
}
export default Footer;
