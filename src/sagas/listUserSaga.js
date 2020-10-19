import { takeLatest, call, put } from "redux-saga/effects";
import {
  getListUserAPI,
  getUserByIdAPI,
  editUserAPI,
  searchUserApi,
} from "../service/listUser";
import { LIST_USER } from "../constant";

function* getListUser(object) {
  const dat = object.data;
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
  const currentPage = obj.data.currentPage;
  const objFilter = obj.data.objFilter;
  const resp = yield call(editUserAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: LIST_USER.EDIT_USER_FAIL, data: resp.message });
    return;
  }
  yield put({ type: LIST_USER.EDIT_USER_SUCCESS, data: resp.data });
  hideModal();
  if (!objFilter) {
    yield put({
      type: LIST_USER.GET_LIST_USER,
      data: { page: currentPage, limit: 10 },
    });
  } else {
    yield put({
      type: LIST_USER.SEARCH_USER,
      data: { ...objFilter, page: currentPage, limit: 10 },
    });
  }
}

function* searchUser(object) {
  const { data } = object;
  const resp = yield call(searchUserApi, data);
  if (resp.code !== 200) {
    yield put({ type: LIST_USER.SEARCH_USER_FAIL, data: resp.message });
    return;
  }
  yield put({ type: LIST_USER.SEARCH_USER_SUCCESS, data: resp.data });
}

export const listUserSaga = [
  takeLatest(LIST_USER.GET_LIST_USER, getListUser),
  takeLatest(LIST_USER.GET_USER_BY_ID, getUserById),
  takeLatest(LIST_USER.EDIT_USER, editUser),
  takeLatest(LIST_USER.SEARCH_USER, searchUser),
];
