import React from "react";
import TitlePage from "../../components/TitlePage";
import { connect } from "react-redux";
import { TextArea } from "carbon-components-react";
import { Redirect } from "react-router-dom";
import ButtonLoading from "../../components/ButtonLoading";
import ButtonOutline from "../../components/ButtonOutline";
import { getToken } from "../../utils/token";
import "./index.scss";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.isComponentMounted = false;
    this.state = {
      itemVideo: {},
      textComment: ""
    };
  }
  componentDidMount() {
    this.isComponentMounted = true;
    // Fetch video by Id
    const {
      match: { params: { id = "" } = {} } = {},
      dummyListVideo
    } = this.props;
    const videoById = dummyListVideo.find(element => element._id === id);
    if (videoById) {
      this.setState({
        itemVideo: videoById
      });
    }
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = this.loadVideo;

      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      this.loadVideo();
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  handleChangeComment = value => {
    this.setState({ textComment: value });
  };

  handleSubmit = () => {
    const { textComment } = this.state;
    alert(`Your comment: ${textComment}`);
    this.setState({ textComment: "" });
  };

  loadVideo = () => {
    this.player = new window.YT.Player(`player`, {
      videoId: "KjvM4WJcedA",
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange
      }
    });
  };

  onPlayerReady = event => {
    event.target.playVideo();
  };

  onPlayerStateChange = event => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setTimeout(this.stopVideo, 10000);
    }
  };
  stopVideo = () => {
    this.player.stopVideo();
    const {token} = getToken()
    if (this.isComponentMounted && token) {
      alert("Bạn đã xem đủ 10 giây, bạn nhận được 100 CXC")
    }
  };

  render() {
    const { match: { params: { id = "" } = {} } = {} } = this.props;
    const { itemVideo, textComment } = this.state;
    if (!id) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container__detail">
        <TitlePage title={itemVideo.title || "Video Not Found"} />
        <div className="container__detail__view__player">
          <div id="player" className="container__detail__player" />
        </div>
        <div className="container__detail__viewTitle">
          <div className="container__detail__viewTitle--text">
            {itemVideo.title}
          </div>
        </div>
        <div className="container__detail__comment">
          <div className="container__detail__comment__title">COMMENTS</div>
          <div className="container__detail__comment__box compose__comment">
            <img
              className="comment__avatar"
              src={require("../../images/testAvatar.jpg")}
              alt="img-avatar"
            />
            <div style={{ width: "90%" }}>
              <div className="comment__textArea">
                <TextArea
                  cols={0}
                  id="composeComment"
                  labelText=""
                  hideLabel
                  value={textComment}
                  onChange={event =>
                    this.handleChangeComment(event.target.value)
                  }
                  placeholder="Add a public comment"
                  rows={0}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <ButtonOutline
                  onClick={() =>
                    this.setState({
                      textComment: ""
                    })
                  }
                  disabled={false}
                  // renderIcon={Reply32}
                  text="Cancel"
                  style={{
                    width: "7rem",
                    height: "30px",
                    marginTop: "7px"
                  }}
                />

                <ButtonLoading
                  onClick={this.handleSubmit}
                  // disabled={loading}
                  disabled={!textComment}
                  // loading={loading ? "yes" : undefined}
                  // type="submit"
                  text="Comment"
                  // renderIcon={UserIdentification32}
                  style={{
                    width: "7rem",
                    height: "30px",
                    marginTop: "7px",
                    marginLeft: "10px"
                  }}
                />
              </div>
            </div>
          </div>
          <div className="container__detail__comment__box list__comment">
            <img
              className="comment__avatar"
              src={require("../../images/testAvatar.jpg")}
              alt="img-avatar"
            />
            <div>
              <div style={{ marginBottom: "1rem" }}>
                <span className="list__comment--name">Name</span>
                <span className="list__comment--time">2 month ago</span>
              </div>
              <p className="list__comment--content">Content comment</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ products: { dummyListVideo } = {} }) => ({
  dummyListVideo
});

const mapDispatchToProps = dispatch => ({
  // getAllProduct: () => dispatch({ type: "GET_ALL_PRODUCT" }),
  // clearData: () => dispatch({ type: "CLEAR_DATA" }),
  // setData: data => dispatch({ type: "SET_STATE_REDUCER", data })
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
