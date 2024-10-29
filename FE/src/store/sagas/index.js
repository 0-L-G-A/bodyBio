import { all } from 'redux-saga/effects';
import { watchAuthSaga } from './auth';

export function* rootSaga() {
  yield all([watchAuthSaga()]);
}
