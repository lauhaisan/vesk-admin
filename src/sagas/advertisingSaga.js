import { takeLatest, call, put, select } from "redux-saga/effects";
import {
  getListAdsAPI,
  getAdsByIdAPI,
  editAdsAPI,
  deleteAdsByIdAPI,
  addNewAdsAPI,
  searchAdsApi,
} from "../service/advertising";
import { ADVERTISING } from "../constant";

const stateAdvertising = (state) => state.advertising;

function* getListAds(object) {
  try {
    const dat = object.data;
    const resp = yield call(getListAdsAPI, dat);
    const { code, data, message } = resp;
    if (code !== 200) throw message;
    yield put({ type: ADVERTISING.GET_LIST_ADS_SUCCESS, data: data });
  } catch (error) {
    yield put({ type: ADVERTISING.GET_LIST_ADS_FAIL, data: error });
  }
}

function* getAdsById(obj) {
  const dat = obj.data.id;
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
  const currentPage = obj.data.currentPage;
  const keywordSearch = obj.data.keywordSearch;
  const resp = yield call(editAdsAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: ADVERTISING.EDIT_ADS_FAIL, data: resp.message });
    return;
  }
  yield put({ type: ADVERTISING.EDIT_ADS_SUCCESS, data: resp.data });
  hideModal();
  if (!keywordSearch) {
    yield put({
      type: ADVERTISING.GET_LIST_ADS,
      data: { page: currentPage, limit: 10 },
    });
  } else {
    yield put({
      type: ADVERTISING.SEARCH_ADS,
      data: { name: keywordSearch, page: currentPage, limit: 10 },
    });
  }
}

function* deleteAdsById(obj) {
  const dat = obj.data.data;
  const hideModal = obj.data.functionHideModal;
  const currentPage = obj.data.currentPage;
  const keywordSearch = obj.data.keywordSearch;
  const { paging: { total } = {} } = yield select(stateAdvertising);
  const resp = yield call(deleteAdsByIdAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: ADVERTISING.DELETE_ADS_FAIL, data: resp.message });
    return;
  }
  yield put({ type: ADVERTISING.DELETE_ADS_SUCCESS, data: resp.data });
  hideModal();
  const totalPage = Math.ceil((total - 1) / 10);
  let page = totalPage < currentPage ? currentPage - 1 : currentPage;
  page = page !== 0 ? page : 1;
  if (!keywordSearch) {
    yield put({
      type: ADVERTISING.GET_LIST_ADS,
      data: { page, limit: 10 },
    });
  } else {
    yield put({
      type: ADVERTISING.SEARCH_ADS,
      data: { name: keywordSearch, page, limit: 10 },
    });
  }
}

function* addNewAds(obj) {
  const dat = obj.data.data;
  const hideModal = obj.data.functionHideModal;
  const currentPage = obj.data.currentPage;
  const keywordSearch = obj.data.keywordSearch;
  const resp = yield call(addNewAdsAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: ADVERTISING.ADD_NEW_ADS_FAIL, data: resp.message });
    return;
  }
  yield put({ type: ADVERTISING.ADD_NEW_ADS_SUCCESS, data: resp.data });
  hideModal();
  if (!keywordSearch) {
    yield put({
      type: ADVERTISING.GET_LIST_ADS,
      data: { page: currentPage, limit: 10 },
    });
  } else {
    yield put({
      type: ADVERTISING.SEARCH_ADS,
      data: { name: keywordSearch, page: currentPage, limit: 10 },
    });
  }
}

function* searchAds(object) {
  try {
    const { data: dat } = object;
    const resp = yield call(searchAdsApi, dat);
    const { code, data, message } = resp;
    if (code !== 200) throw message;
    yield put({ type: ADVERTISING.SEARCH_ADS_SUCCESS, data: data });
  } catch (error) {
    yield put({ type: ADVERTISING.SEARCH_ADS_FAIL, data: error });
  }
}

export const advertisingSaga = [
  takeLatest(ADVERTISING.GET_LIST_ADS, getListAds),
  takeLatest(ADVERTISING.GET_ADS_BY_ID, getAdsById),
  takeLatest(ADVERTISING.EDIT_ADS, editAds),
  takeLatest(ADVERTISING.DELETE_ADS, deleteAdsById),
  takeLatest(ADVERTISING.ADD_NEW_ADS, addNewAds),
  takeLatest(ADVERTISING.SEARCH_ADS, searchAds),
];
