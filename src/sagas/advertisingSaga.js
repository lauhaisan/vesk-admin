import { takeLatest, call, put } from "redux-saga/effects";
import {
  getListAdsAPI,
  getAdsByIdAPI,
  editAdsAPI,
  deleteAdsByIdAPI,
  addNewAdsAPI
} from "../service/advertising";
import { ADVERTISING } from "../constant";

function* getListAds(object) {
  const dat = object.data.data;
  const resp = yield call(getListAdsAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: ADVERTISING.GET_LIST_ADS_FAIL, data: resp.message });
    return;
  }
  yield put({ type: ADVERTISING.GET_LIST_ADS_SUCCESS, data: resp.data });
}

function* getAdsById(obj) {
  const dat = obj.data.data;
  const resp = yield call(getAdsByIdAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: ADVERTISING.GET_ADS_BY_ID_FAIL, data: resp.message });
    return;
  }
  yield put({ type: ADVERTISING.GET_ADS_BY_ID_SUCCESS, data: resp.data });
}

function* editAds(obj) {
  const dat = obj.data.data;
  const hideModal = obj.data.functionHideModal;
  const resp = yield call(editAdsAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: ADVERTISING.EDIT_ADS_FAIL, data: resp.message });
    return;
  }
  yield put({ type: ADVERTISING.EDIT_ADS_SUCCESS, data: resp.data });
  hideModal();
  yield put({ type: ADVERTISING.GET_LIST_ADS, data: resp.data });
}

function* deleteAdsById(obj) {
  const dat = obj.data.data;
  const hideModal = obj.data.functionHideModal;
  const resp = yield call(deleteAdsByIdAPI, dat);
  console.log(resp);
  if (resp.code !== 200) {
    yield put({ type: ADVERTISING.DELETE_ADS_FAIL, data: resp.message });
    return;
  }
  yield put({ type: ADVERTISING.DELETE_ADS_SUCCESS, data: resp.data });
  hideModal();
  yield put({ type: ADVERTISING.GET_LIST_ADS, data: resp.data });
}

function* addNewAds(obj) {
  const dat = obj.data.data;
  const hideModal = obj.data.functionHideModal;
  const resp = yield call(addNewAdsAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: ADVERTISING.ADD_NEW_ADS_FAIL, data: resp.message });
    return;
  }
  yield put({ type: ADVERTISING.ADD_NEW_ADS_SUCCESS, data: resp.data });
  hideModal();
  yield put({ type: ADVERTISING.GET_LIST_ADS, data: resp.data });
}

export const advertisingSaga = [
  takeLatest(ADVERTISING.GET_LIST_ADS, getListAds),
  takeLatest(ADVERTISING.GET_ADS_BY_ID, getAdsById),
  takeLatest(ADVERTISING.EDIT_ADS, editAds),
  takeLatest(ADVERTISING.DELETE_ADS, deleteAdsById),
  takeLatest(ADVERTISING.ADD_NEW_ADS, addNewAds)
];
