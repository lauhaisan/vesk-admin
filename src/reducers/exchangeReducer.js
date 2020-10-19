import { EXCHANGE } from "../constant";

const INITIAL_STATE = {
  loading: false,
  isCreateExchangeSuccessfully: "",
  messageCreateExchange: "",
  listExchange: [],
  paging: {},
  exchangeRate: {},
  loadingUpdate: false,
  isApproveSuccessfully: "",
  messageApprove: "",
};

const exchangeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EXCHANGE.UPDATE_EXCHANGE_REDUCER:
      return {
        ...state,
        ...action.data,
      };
    case EXCHANGE.CREATE_EXCHANGE:
      return {
        ...state,
        loading: true,
        isCreateExchangeSuccessfully: "",
        messageCreateExchange: "",
      };
    case EXCHANGE.CREATE_EXCHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        isCreateExchangeSuccessfully: true,
        messageCreateExchange: "",
      };
    case EXCHANGE.CREATE_EXCHANGE_FAIL:
      return {
        ...state,
        loading: false,
        isCreateExchangeSuccessfully: false,
        messageCreateExchange: action.data.message,
      };
    case EXCHANGE.GET_HISTORY_EXCHANGE:
      return {
        ...state,
        loading: true,
      };
    case EXCHANGE.GET_HISTORY_EXCHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        listExchange: action.data.items,
        paging: action.data.paging,
      };
    case EXCHANGE.GET_HISTORY_EXCHANGE_FAIL:
      return {
        ...state,
        loading: false,
        listExchange: [],
      };

    case EXCHANGE.GET_EXCHANGE_RATE:
      return {
        ...state,
        loading: true,
      };
    case EXCHANGE.GET_EXCHANGE_RATE_SUCCESS:
      return {
        ...state,
        loading: false,
        exchangeRate: action.data.data,
      };
    case EXCHANGE.GET_EXCHANGE_RATE_FAIL:
      return {
        ...state,
        loading: false,
        exchangeRate: {},
      };

    case EXCHANGE.UPDATE_EXCHANGE_RATE:
      return {
        ...state,
        loadingUpdate: true,
      };
    case EXCHANGE.UPDATE_EXCHANGE_RATE_SUCCESS:
      return {
        ...state,
        loadingUpdate: false,
      };
    case EXCHANGE.UPDATE_EXCHANGE_RATE_FAIL:
      return {
        ...state,
        loadingUpdate: false,
      };
    case EXCHANGE.APPROVE_EXCHANGE:
      return {
        ...state,
        loadingUpdate: true,
        isApproveSuccessfully: "",
        messageApprove: "",
      };
    case EXCHANGE.APPROVE_EXCHANGE_SUCCESS:
      return {
        ...state,
        loadingUpdate: false,
        isApproveSuccessfully: true,
        messageApprove: "",
      };
    case EXCHANGE.APPROVE_EXCHANGE_FAIL:
      return {
        ...state,
        loadingUpdate: false,
        isApproveSuccessfully: false,
        messageApprove: "Approve Exchange Failed",
      };

    default:
      return state;
  }
};

export default exchangeReducer;
