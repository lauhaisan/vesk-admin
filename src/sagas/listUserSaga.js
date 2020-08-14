import { takeLatest, call, put } from "redux-saga/effects";
import {
  getListUserAPI,
  getUserByIdAPI,
  editUserAPI
} from "../service/listUser";
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

function* getUserById(obj) {
  const dat = obj.data.data;
  const resp = yield call(getUserByIdAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: LIST_USER.GET_USER_BY_ID_FAIL, data: resp.message });
    return;
  }
  yield put({ type: LIST_USER.GET_USER_BY_ID_SUCCESS, data: resp.data });
}

function* editUser(obj) {
  const dat = obj.data.data;
  const hideModal = obj.data.functionHideModal;
  const resp = yield call(editUserAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: LIST_USER.EDIT_USER_FAIL, data: resp.message });
    return;
  }
  yield put({ type: LIST_USER.EDIT_USER_SUCCESS, data: resp.data });
  hideModal();
  yield put({ type: LIST_USER.GET_LIST_USER, data: resp.data });
}

export const listUserSaga = [
  takeLatest(LIST_USER.GET_LIST_USER, getListUser),
  takeLatest(LIST_USER.GET_USER_BY_ID, getUserById),
  takeLatest(LIST_USER.EDIT_USER, editUser)
];
