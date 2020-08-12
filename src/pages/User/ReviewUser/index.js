import React from "react";
import TitlePage from "../../../components/TitlePage";

class ReviewUser extends React.Component {
  render() {
    const { match: { params: { id = "" } = {} } = {} } = this.props;

    return (
      <div style={{ backgroundColor: "#fff" }}>
        <TitlePage title={id} />
        <h1>User ID: {id}</h1>
      </div>
    );
  }
}
export default ReviewUser;
