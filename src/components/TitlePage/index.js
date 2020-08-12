import React, { Component } from "react";
import { Helmet } from "react-helmet";

class TitlePage extends Component {
  render() {
    const { title } = this.props;
    return (
      <Helmet>
        <title>{title}</title>
      </Helmet>
    );
  }
}

export default TitlePage;
