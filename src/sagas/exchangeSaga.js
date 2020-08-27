import { takeLatest, call, put } from "redux-saga/effects";
import { createExchangeAPI } from "../service/exchange";
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

export const exchangeSaga = [
  takeLatest(EXCHANGE.CREATE_EXCHANGE, createExchange),
];
