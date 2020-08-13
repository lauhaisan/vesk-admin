import React, { Component, Fragment } from "react";
import { Modal } from "carbon-components-react";
import ButtonLoading from "../../components/ButtonLoading";
import ButtonOutline from "../../components/ButtonOutline";
import "./index.scss";

export default class index extends Component {
  render() {
    const {
      isReview = false,
      open = false,
      contentModal = "Your Content",
      title = "",
      hideModal,
      onSubmit,
      loading,
      textSubmit
    } = this.props;
    return (
      <Modal
        className="customModal"
        modalHeading={title}
        passiveModal={true}
        onRequestClose={hideModal}
        open={open}
        size="sm"
      >
        <Fragment>
          {contentModal}
          <div className="customModal__viewBtn">
            <ButtonOutline
              onClick={hideModal}
              disabled={false}
              text="Cancel"
              style={{
                margin: "10px 10px 0px",
                width: "90px",
                height: "47px"
              }}
            />
            <ButtonLoading
              onClick={onSubmit}
              disabled={loading || isReview}
              //   loading={loading ? "yes" : undefined}
              type="submit"
              text={textSubmit}
              style={{
                margin: "10px 0",
                width: "90px",
                height: "47px"
              }}
            />
          </div>
        </Fragment>
      </Modal>
    );
  }
}
