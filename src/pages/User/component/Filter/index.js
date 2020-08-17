import React, { Component, Fragment } from "react";
import "./index.scss";

class Filter extends Component {
  render() {
    const a = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
      <Fragment>
        <div class="bx--row">
          {a.map((item) => (
            <div class="bx--col-md-2 bx--col-sm-4">
              <div
                style={{
                  width: "100%",
                  minWidth: "200px",
                  backgroundColor: "yellow",
                }}
              >
                Content From
              </div>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default Filter;
