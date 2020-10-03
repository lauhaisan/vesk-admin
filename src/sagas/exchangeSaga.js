import { takeLatest, call, put } from "redux-saga/effects";
import { createExchangeAPI, getListExchangeAPI } from "../service/exchange";
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

export const exchangeSaga = [
  takeLatest(EXCHANGE.CREATE_EXCHANGE, createExchange),
  takeLatest(EXCHANGE.GET_HISTORY_EXCHANGE, getListExchange),
];
