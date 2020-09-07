import { takeLatest, call, put } from "redux-saga/effects";
import { uploadApi } from "../service/upload";
import { UPLOAD } from "../constant";

function* upload(object) {
  const payload = object.data.data;
  const { file, isContract } = payload;
  const resp = yield call(uploadApi, file);
  if (resp.status !== 200) {
    yield put({
      type: UPLOAD.UPLOAD_IMAGE_FAIL,
    });
    return;
  }
  if (isContract) {
    yield put({
      type: UPLOAD.UPLOAD_IMAGE_CONTRACT_SUCCESS,
      data: resp.link,
    });
  } else {
    yield put({
      type: UPLOAD.UPLOAD_IMAGE_SUCCESS,
      data: resp.link,
    });
  }
}

export const uploadSaga = [takeLatest(UPLOAD.UPLOAD_IMAGE, upload)];
