import { takeLatest, call, put } from "redux-saga/effects";
import {
  createExchangeAPI,
  getListExchangeAPI,
  getExchangeRateAPI,
  updateExchangeRateAPI,
  approveExchangeAPI,
} from "../service/exchange";
import { EXCHANGE } from "../constant";

function* createExchange(obj) {
  const dat = obj.data.data;
  const hideModal = obj.data.functionHideModal;
  const resp = yield call(createExchangeAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: EXCHANGE.CREATE_EXCHANGE_FAIL, data: resp.message });
    return;
  }
  yield put({ type: EXCHANGE.CREATE_EXCHANGE_SUCCESS, data: resp.data });
  hideModal();
}

function* getListExchange() {
  const resp = yield call(getListExchangeAPI);
  if (resp.code !== 200) {
    yield put({ type: EXCHANGE.GET_HISTORY_EXCHANGE_FAIL, data: resp.message });
    return;
  }
  yield put({ type: EXCHANGE.GET_HISTORY_EXCHANGE_SUCCESS, data: resp.data });
}

function* getExchangeRate() {
  const resp = yield call(getExchangeRateAPI);
  if (resp.code !== 200) {
    yield put({ type: EXCHANGE.GET_EXCHANGE_RATE_FAIL });
    return;
  }
  yield put({ type: EXCHANGE.GET_EXCHANGE_RATE_SUCCESS, data: resp });
}

function* updateExchangeRate(obj) {
  const dat = obj.data.data;
  const hideEdit = obj.data.functionHideEdit;
  const resp = yield call(updateExchangeRateAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: EXCHANGE.UPDATE_EXCHANGE_RATE_FAIL, data: resp.message });
    return;
  }
  yield put({ type: EXCHANGE.UPDATE_EXCHANGE_RATE_SUCCESS, data: resp.data });
  hideEdit();
  yield put({ type: EXCHANGE.GET_EXCHANGE_RATE });
}

function* approveExchange(obj) {
  const dat = obj.data.data;
  const hideModal = obj.data.functionHideModal;
  const resp = yield call(approveExchangeAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: EXCHANGE.APPROVE_EXCHANGE_FAIL, data: resp.message });
    return;
  }
  yield put({ type: EXCHANGE.APPROVE_EXCHANGE_SUCCESS, data: resp.data });
  hideModal();
  yield put({ type: EXCHANGE.GET_HISTORY_EXCHANGE });
}

export const exchangeSaga = [
  takeLatest(EXCHANGE.CREATE_EXCHANGE, createExchange),
  takeLatest(EXCHANGE.GET_HISTORY_EXCHANGE, getListExchange),
  takeLatest(EXCHANGE.GET_EXCHANGE_RATE, getExchangeRate),
  takeLatest(EXCHANGE.UPDATE_EXCHANGE_RATE, updateExchangeRate),
  takeLatest(EXCHANGE.APPROVE_EXCHANGE, approveExchange),
];
