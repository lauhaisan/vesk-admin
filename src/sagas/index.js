import { all } from "redux-saga/effects";
import { productSaga } from "./productSaga.js";
import { userSaga } from "./userSaga";
import { listUserSaga } from "./listUserSaga";
export default function* rootSaga() {
  yield all([...productSaga, ...userSaga, ...listUserSaga]);
}
