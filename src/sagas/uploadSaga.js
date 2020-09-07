import { takeLatest, call, put } from "redux-saga/effects";
import { uploadApi } from "../service/upload";
import { UPLOAD } from "../constant";

function* upload(object) {
  const dat = object.data.data;
  const resp = yield call(uploadApi, dat);
  if (resp.status !== 200) {
    yield put({
      type: UPLOAD.UPLOAD_IMAGE_FAIL,
    });
    return;
  }
  yield put({
    type: UPLOAD.UPLOAD_IMAGE_SUCCESS,
    data: resp.link,
  });
}

export const uploadSaga = [takeLatest(UPLOAD.UPLOAD_IMAGE, upload)];
