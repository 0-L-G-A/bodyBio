import { signUpUserPostApi } from 'api/auth';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  signUpUserFailure,
  signUpUser,
  signUpUserSuccess,
} from 'store/actions/auth';

function* signUpUserSaga(action) {
  try {
    const response = yield call(signUpUserPostApi, action.payload);
    yield put(signUpUserSuccess(response.user));
  } catch (error) {
    yield put(signUpUserFailure(error));
  }
}

export function* watchAuthSaga() {
  yield takeLatest(signUpUser.type, signUpUserSaga);
}
