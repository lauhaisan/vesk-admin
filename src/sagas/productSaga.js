import { takeLatest, call, put, delay } from "redux-saga/effects";
import { getAllProduct } from "../service/product";
import { PRODUCT } from "../constant";

function* getAllProducts() {
  yield delay(500);
  const resp = yield call(getAllProduct);
  if (resp.statusCode === 401) {
    yield put({ type: "EXPIRED_TOKEN", data: resp.message });
    yield put({ type: "GET_ALL_PRODUCT_FAIL", data: resp.message });
    return;
  }
  if (resp.statusCode !== 200) {
    yield put({ type: "GET_ALL_PRODUCT_FAIL", data: resp.message });
    return;
  }
  yield put({ type: "GET_ALL_PRODUCT_SUCCESS", data: resp.listProduct });
}

export const productSaga = [
  takeLatest(PRODUCT.GET_ALL_PRODUCT, getAllProducts),
];
