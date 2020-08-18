import { takeLatest, call, put } from "redux-saga/effects";
import {
  getListSocialMediaAPI,
  getByIdAPI,
  editSocialMediaAPI
  // deleteAdsByIdAPI,
  // addNewAdsAPI
} from "../service/socialMedia";
import { SOCIAL_MEDIA } from "../constant";

function* getListSocialMedia(object) {
  const dat = object.data;
  const resp = yield call(getListSocialMediaAPI, dat);
  if (resp.code !== 200) {
    yield put({
      type: SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA_FAIL,
      data: resp.message
    });
    return;
  }
  yield put({
    type: SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA_SUCCESS,
    data: resp.data
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

function* editSocialMedia(obj) {
  const dat = obj.data.data;
  const hideModal = obj.data.functionHideModal;
  const resp = yield call(editSocialMediaAPI, dat);
  if (resp.code !== 200) {
    yield put({
      type: SOCIAL_MEDIA.EDIT_SOCIAL_MEDIA_FAIL,
      data: resp.message
    });
    return;
  }
  yield put({ type: SOCIAL_MEDIA.EDIT_SOCIAL_MEDIA_SUCCESS, data: resp.data });
  hideModal();
  yield put({ type: SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA, data: resp.data });
}

// function* deleteAdsById(obj) {
//   const dat = obj.data.data;
//   const hideModal = obj.data.functionHideModal;
//   const resp = yield call(deleteAdsByIdAPI, dat);
//   console.log(resp);
//   if (resp.code !== 200) {
//     yield put({ type: ADVERTISING.DELETE_ADS_FAIL, data: resp.message });
//     return;
//   }
//   yield put({ type: ADVERTISING.DELETE_ADS_SUCCESS, data: resp.data });
//   hideModal();
//   yield put({ type: ADVERTISING.GET_LIST_ADS, data: resp.data });
// }

// function* addNewAds(obj) {
//   const dat = obj.data.data;
//   const hideModal = obj.data.functionHideModal;
//   const resp = yield call(addNewAdsAPI, dat);
//   if (resp.code !== 200) {
//     yield put({ type: ADVERTISING.ADD_NEW_ADS_FAIL, data: resp.message });
//     return;
//   }
//   yield put({ type: ADVERTISING.ADD_NEW_ADS_SUCCESS, data: resp.data });
//   hideModal();
//   yield put({ type: ADVERTISING.GET_LIST_ADS, data: resp.data });
// }

export const socialMediaSaga = [
  takeLatest(SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA, getListSocialMedia),
  takeLatest(SOCIAL_MEDIA.GET_BY_ID, getSocialMediaById),
  takeLatest(SOCIAL_MEDIA.EDIT_SOCIAL_MEDIA, editSocialMedia)
  // takeLatest(ADVERTISING.DELETE_ADS, deleteAdsById),
  // takeLatest(ADVERTISING.ADD_NEW_ADS, addNewAds),
];
