import { EXCHANGE } from "../constant";

const INITIAL_STATE = {
  loading: false,
  isCreateExchangeSuccessfully: "",
  messageCreateExchange: "",
  listExchange: [],
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
      };
    case EXCHANGE.GET_HISTORY_EXCHANGE_FAIL:
      return {
        ...state,
        loading: false,
        listExchange: [],
      };

    default:
      return state;
  }
};

export default exchangeReducer;
