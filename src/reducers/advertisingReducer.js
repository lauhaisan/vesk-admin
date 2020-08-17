import { ADVERTISING } from "../constant";

const INITIAL_STATE = {
  loading: false,
  listAds: [],
  paging: {},
  messageError: "",
  loadingGetAdsById: false,
  itemAds: {},
  loadingActionAds: false,
  actionAdsSuccessfully: ""
};

const advertisingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADVERTISING.GET_LIST_ADS:
      return {
        ...state,
        loading: true,
        messageError: ""
      };
    case ADVERTISING.GET_LIST_ADS_SUCCESS:
      return {
        ...state,
        loading: false,
        listAds: action.data.items,
        paging: action.data.paging,
        messageError: ""
      };
    case ADVERTISING.GET_LIST_ADS_FAIL:
      return {
        ...state,
        loading: false,
        listAds: [],
        messageError: action.data
      };
    case ADVERTISING.GET_ADS_BY_ID:
      return {
        ...state,
        loadingGetAdsById: true,
        messageError: ""
      };
    case ADVERTISING.GET_ADS_BY_ID_SUCCESS:
      return {
        ...state,
        loadingGetAdsById: false,
        itemAds: action.data,
        messageError: ""
      };
    case ADVERTISING.GET_ADS_BY_ID_FAIL:
      return {
        ...state,
        loadingGetAdsById: false,
        itemAds: {},
        messageError: action.data
      };
    case ADVERTISING.EDIT_ADS:
      return {
        ...state,
        loadingActionAds: true,
        actionAdsSuccessfully: "",
        messageError: ""
      };
    case ADVERTISING.EDIT_ADS_SUCCESS:
      return {
        ...state,
        loadingActionAds: false,
        actionAdsSuccessfully: true,
        messageError: ""
      };
    case ADVERTISING.EDIT_ADS_FAIL:
      return {
        ...state,
        loadingActionAds: false,
        actionAdsSuccessfully: false,
        messageError: action.data
      };
    case ADVERTISING.SET_STATE_REDUCER:
      return {
        ...state,
        ...action.data
      };
    case ADVERTISING.DELETE_ADS:
      return {
        ...state,
        loadingActionAds: true,
        actionAdsSuccessfully: "",
        messageError: ""
      };
    case ADVERTISING.DELETE_ADS_SUCCESS:
      return {
        ...state,
        loadingActionAds: false,
        actionAdsSuccessfully: true,
        messageError: ""
      };
    case ADVERTISING.DELETE_ADS_FAIL:
      return {
        ...state,
        loadingActionAds: false,
        actionAdsSuccessfully: false,
        messageError: action.data
      };
    case ADVERTISING.ADD_NEW_ADS:
      return {
        ...state,
        loadingActionAds: true,
        actionAdsSuccessfully: "",
        messageError: ""
      };
    case ADVERTISING.ADD_NEW_ADS_SUCCESS:
      return {
        ...state,
        loadingActionAds: false,
        actionAdsSuccessfully: true,
        messageError: ""
      };
    case ADVERTISING.ADD_NEW_ADS_FAIL:
      return {
        ...state,
        loadingActionAds: false,
        actionAdsSuccessfully: false,
        messageError: action.data
      };

    default:
      return state;
  }
};

export default advertisingReducer;
