import { takeLatest, call, put, delay } from "redux-saga/effects";
import { signUpAPI, signInAPI, logoutAPI, getMyInfoAPI } from "../service/user";
import { setToken } from "../utils/token";
import { USER } from "../constant";

function* handleSignUp(object) {
  const dat = object.data.data;
  const history = object.data.history;
  yield delay(500);
  const resp = yield call(signUpAPI, dat);
  console.log("resp", resp);
  if (resp.code !== 200) {
    yield put({ type: "USER_SIGNUP_FAIL", data: resp });
    return;
  }
  const { data = {}, data: { token } = {} } = resp;
  setToken({
    token,
    data
  });
  yield put({ type: "USER_SIGNUP_SUCCESS" });
  yield delay(3000);
  yield call(history.push, "/");
}

function* handleSignIn(object) {
  const dat = object.data.data;
  const history = object.data.history;
  yield delay(500);
  const resp = yield call(signInAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: "USER_SIGNIN_FAIL", data: resp });
    return;
  }
  const { data = {}, data: { token } = {} } = resp;
  setToken({
    token,
    data
  });
  yield put({ type: "USER_SIGNIN_SUCCESS" });
  yield call(history.push, "/");
}

function* handleLogout(object) {
  const history = object.data;
  yield delay(500);
  const resp = yield call(logoutAPI);
  if (resp.statusCode !== 200) {
    yield put({ type: "USER_LOGOUT_FAIL", data: resp });
    return;
  }
  setToken(undefined);
  yield put({ type: "USER_LOGOUT_SUCCESS" });
  if (history) {
    yield call(history.push, "/");
  }
}

function* getMyInfo() {
  const resp = yield call(getMyInfoAPI);
  if (resp.statusCode !== 200) {
    yield put({ type: "GET_MY_INFO_FAIL" });
    return;
  }
  yield put({ type: "GET_MY_INFO_SUCCESS", data: resp });
}

export const userSaga = [
  takeLatest(USER.SIGNUP, handleSignUp),
  takeLatest(USER.SIGNIN, handleSignIn),
  takeLatest(USER.LOGOUT, handleLogout),
  takeLatest(USER.GET_MY_INFO, getMyInfo)
];
