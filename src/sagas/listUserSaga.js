import { takeLatest, call, put } from "redux-saga/effects";
import { getListUserAPI } from "../service/listUser";
import { LIST_USER } from "../constant";

function* getListUser(object) {
  const dat = object.data.data;
  const resp = yield call(getListUserAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: LIST_USER.GET_LIST_USER_FAIL, data: resp.message });
    return;
  }
  yield put({ type: LIST_USER.GET_LIST_USER_SUCCESS, data: resp.data });
}

export const listUserSaga = [takeLatest(LIST_USER.GET_LIST_USER, getListUser)];
