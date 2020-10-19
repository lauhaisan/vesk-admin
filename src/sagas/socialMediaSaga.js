import { takeLatest, call, put, select } from "redux-saga/effects";
import {
  getListSocialMediaAPI,
  getByIdAPI,
  editSocialMediaAPI,
  deleteSocialMediaAPI,
  addNewSocialMediaAPI,
  searchSocialMediaAPI,
} from "../service/socialMedia";
import { SOCIAL_MEDIA } from "../constant";

const stateSocialMedia = (state) => state.socialMedia;

function* getListSocialMedia(object) {
  const dat = object.data;
  const resp = yield call(getListSocialMediaAPI, dat);
  if (resp.code !== 200) {
    yield put({
      type: SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA_FAIL,
      data: resp.message,
    });
    return;
  }
  yield put({
    type: SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA_SUCCESS,
    data: resp.data,
  });
}

function* getSocialMediaById(obj) {
  const dat = obj.data.id;
  const resp = yield call(getByIdAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: SOCIAL_MEDIA.GET_BY_ID_FAIL, data: resp.message });
    return;
  }
  yield put({ type: SOCIAL_MEDIA.GET_BY_ID_SUCCESS, data: resp.data });
}

function* addNewSocialMedia(obj) {
  const dat = obj.data.data;
  const hideModal = obj.data.functionHideModal;
  const currentPage = obj.data.currentPage;
  const keywordSearch = obj.data.keywordSearch;
  const resp = yield call(addNewSocialMediaAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: SOCIAL_MEDIA.ADD_NEW_FAIL, data: resp.message });
    return;
  }
  yield put({ type: SOCIAL_MEDIA.ADD_NEW_SUCCESS, data: resp.data });
  hideModal();
  if (!keywordSearch) {
    yield put({
      type: SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA,
      data: { page: currentPage, limit: 10 },
    });
  } else {
    yield put({
      type: SOCIAL_MEDIA.SEARCH_SOCIAL_MEDIA,
      data: { name: keywordSearch, page: currentPage, limit: 10 },
    });
  }
}

function* editSocialMedia(obj) {
  const dat = obj.data.data;
  const hideModal = obj.data.functionHideModal;
  const currentPage = obj.data.currentPage;
  const keywordSearch = obj.data.keywordSearch;
  const resp = yield call(editSocialMediaAPI, dat);
  if (resp.code !== 200) {
    yield put({
      type: SOCIAL_MEDIA.EDIT_SOCIAL_MEDIA_FAIL,
      data: resp.message,
    });
    return;
  }
  yield put({ type: SOCIAL_MEDIA.EDIT_SOCIAL_MEDIA_SUCCESS, data: resp.data });
  hideModal();
  if (!keywordSearch) {
    yield put({
      type: SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA,
      data: { page: currentPage, limit: 10 },
    });
  } else {
    yield put({
      type: SOCIAL_MEDIA.SEARCH_SOCIAL_MEDIA,
      data: { name: keywordSearch, page: currentPage, limit: 10 },
    });
  }
}

function* deleteSocialMedia(obj) {
  const dat = obj.data.data;
  const hideModal = obj.data.functionHideModal;
  const currentPage = obj.data.currentPage;
  const keywordSearch = obj.data.keywordSearch;
  const { paging: { total } = {} } = yield select(stateSocialMedia);
  console.log("total", total);
  const resp = yield call(deleteSocialMediaAPI, dat);
  if (resp.code !== 200) {
    yield put({
      type: SOCIAL_MEDIA.DELETE_SOCIAL_MEDIA_FAIL,
      data: resp.message,
    });
    return;
  }
  yield put({
    type: SOCIAL_MEDIA.DELETE_SOCIAL_MEDIA_SUCCESS,
    data: resp.data,
  });
  hideModal();
  const totalPage = Math.ceil((total - 1) / 10);
  let page = totalPage < currentPage ? currentPage - 1 : currentPage;
  page = page !== 0 ? page : 1;
  if (!keywordSearch) {
    yield put({
      type: SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA,
      data: { page, limit: 10 },
    });
  } else {
    yield put({
      type: SOCIAL_MEDIA.SEARCH_SOCIAL_MEDIA,
      data: { name: keywordSearch, page, limit: 10 },
    });
  }
  // yield put({ type: SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA, data: resp.data });
}

function* searchSocialMedia(obj) {
  const { data } = obj;
  const resp = yield call(searchSocialMediaAPI, data);
  if (resp.code !== 200) {
    yield put({
      type: SOCIAL_MEDIA.SEARCH_SOCIAL_MEDIA_FAIL,
      data: resp.message,
    });
    return;
  }
  yield put({
    type: SOCIAL_MEDIA.SEARCH_SOCIAL_MEDIA_SUCCESS,
    data: resp.data,
  });
}

export const socialMediaSaga = [
  takeLatest(SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA, getListSocialMedia),
  takeLatest(SOCIAL_MEDIA.GET_BY_ID, getSocialMediaById),
  takeLatest(SOCIAL_MEDIA.EDIT_SOCIAL_MEDIA, editSocialMedia),
  takeLatest(SOCIAL_MEDIA.ADD_NEW, addNewSocialMedia),
  takeLatest(SOCIAL_MEDIA.SEARCH_SOCIAL_MEDIA, searchSocialMedia),
  takeLatest(SOCIAL_MEDIA.DELETE_SOCIAL_MEDIA, deleteSocialMedia),
];
