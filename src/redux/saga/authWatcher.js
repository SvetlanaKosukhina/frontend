import { call, put, takeEvery } from 'redux-saga/effects';

import {
  registrationApi,
  loginApi,
  logoutApi,
  whoAmIApi,
} from '../../api/authApi';
import actionTypes from '../actionTypes';
import {
  registrationSuccess,
  registrationRejected,
  loginSuccess,
  loginRejected,
  logoutSuccess,
  logoutRejected,
  whoAmIRejected,
  whoAmISuccess,
} from '../actions/authAction';

function* registrationWorker({ payload }) {
  try {
    const data = yield call(registrationApi, payload);
    localStorage.setItem('cookieRefreshToken', data.accessToken);
    yield put(registrationSuccess(data));
  } catch (error) {
    yield put(registrationRejected());
  }
}

function* loginWorker({ payload }) {
  try {
    const data = yield call(loginApi, payload);
    localStorage.setItem('cookieRefreshToken', data.accessToken);
    yield put(loginSuccess(data));
  } catch (error) {
    yield put(loginRejected());
  }
}

function* logoutWorker() {
  try {
    const data = yield call(logoutApi);
    yield put(logoutSuccess(data));
  } catch (error) {
    yield put(logoutRejected());
  }
}

function* whoAmIWorker() {
  try {
    const data = yield call(whoAmIApi);
    yield put(whoAmISuccess(data));
  } catch (error) {
    yield put(whoAmIRejected());
  }
}

function* authWatcher() {
  yield takeEvery(actionTypes.REGISTRATION_REQUESTED, registrationWorker);
  yield takeEvery(actionTypes.LOGIN_REQUESTED, loginWorker);
  yield takeEvery(actionTypes.LOGOUT_REQUESTED, logoutWorker);
  yield takeEvery(actionTypes.WHOAMI_REQUESTED, whoAmIWorker);
}

export default authWatcher;