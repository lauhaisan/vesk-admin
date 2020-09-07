import { UPLOAD } from "../constant";

const INITIAL_STATE = {
  loading: false,
  link: "",
  messageUpload: "",
};

const uploadReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPLOAD.UPDATE_STATE_UPLOAD_REDUCER:
      return {
        ...state,
        ...action.data,
      };
    case UPLOAD.UPLOAD_IMAGE:
      return {
        ...state,
        loading: true,
        messageUpload: "",
      };
    case UPLOAD.UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        link: action.data,
        messageUpload: "",
      };
    case UPLOAD.UPLOAD_IMAGE_FAIL:
      return {
        ...state,
        loading: false,
        messageUpload: "Upload Image Failed",
      };
    default:
      return state;
  }
};

export default uploadReducer;
