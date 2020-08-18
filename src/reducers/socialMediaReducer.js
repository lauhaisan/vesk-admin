import { SOCIAL_MEDIA } from "../constant";

const INITIAL_STATE = {
  loading: false,
  listSocialMedia: [],
  paging: {},
  messageError: "",
  loadingGetById: false,
  itemMediaSocial: {},
  loadingAction: false,
  actionSuccessfully: ""
};

const socialMediaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA:
      return {
        ...state,
        loading: true,
        messageError: ""
      };
    case SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        listSocialMedia: action.data.items,
        paging: action.data.paging,
        messageError: ""
      };
    case SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA_FAIL:
      return {
        ...state,
        loading: false,
        listSocialMedia: [],
        messageError: action.data
      };
    case SOCIAL_MEDIA.GET_BY_ID:
      return {
        ...state,
        loadingGetById: true,
        messageError: ""
      };
    case SOCIAL_MEDIA.GET_BY_ID_SUCCESS:
      return {
        ...state,
        loadingGetById: false,
        itemMediaSocial: action.data,
        messageError: ""
      };
    case SOCIAL_MEDIA.GET_BY_ID_FAIL:
      return {
        ...state,
        loadingGetById: false,
        itemMediaSocial: {},
        messageError: action.data
      };
    case SOCIAL_MEDIA.EDIT_SOCIAL_MEDIA:
      return {
        ...state,
        loadingAction: true,
        actionSuccessfully: "",
        messageError: ""
      };
    case SOCIAL_MEDIA.EDIT_SOCIAL_MEDIA_SUCCESS:
      return {
        ...state,
        loadingAction: false,
        actionSuccessfully: true,
        messageError: ""
      };
    case SOCIAL_MEDIA.EDIT_SOCIAL_MEDIA_FAIL:
      return {
        ...state,
        loadingAction: false,
        actionSuccessfully: false,
        messageError: action.data
      };
    case SOCIAL_MEDIA.ADD_NEW:
      return {
        ...state,
        loadingAction: true,
        actionSuccessfully: "",
        messageError: ""
      };
    case SOCIAL_MEDIA.ADD_NEW_SUCCESS:
      return {
        ...state,
        loadingAction: false,
        actionSuccessfully: true,
        messageError: ""
      };
    case SOCIAL_MEDIA.ADD_NEW_FAIL:
      return {
        ...state,
        loadingAction: false,
        actionSuccessfully: false,
        messageError: action.data
      };

    case SOCIAL_MEDIA.DELETE_SOCIAL_MEDIA:
      return {
        ...state,
        loadingAction: true,
        actionSuccessfully: "",
        messageError: ""
      };
    case SOCIAL_MEDIA.DELETE_SOCIAL_MEDIA_SUCCESS:
      return {
        ...state,
        loadingAction: false,
        actionSuccessfully: true,
        messageError: ""
      };
    case SOCIAL_MEDIA.DELETE_SOCIAL_MEDIA_FAIL:
      return {
        ...state,
        loadingAction: false,
        actionSuccessfully: false,
        messageError: action.data
      };

    case SOCIAL_MEDIA.SET_STATE_REDUCER:
      return {
        ...state,
        ...action.data
      };

    default:
      return state;
  }
};

export default socialMediaReducer;
