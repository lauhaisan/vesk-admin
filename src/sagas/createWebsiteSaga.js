import { takeLatest, call, put } from "redux-saga/effects";
import { getCreateWebAPI } from "../service/listUser";
import { CREATE_WEBSITE } from "../constant";

function* getListCreateWebsite(object) {
  const dat = object.data;
  const resp = yield call(getCreateWebAPI, dat);
  const { code, data } = resp;
  if (code !== 200) {
    yield put({ type: CREATE_WEBSITE.CREATE_WEBSITE_FAIL });
    return;
  }
  yield put({ type: CREATE_WEBSITE.CREATE_WEBSITE_SUCCESS, data });
}

export const createWebsiteSaga = [
  takeLatest(CREATE_WEBSITE.CREATE_WEBSITE, getListCreateWebsite),
];
