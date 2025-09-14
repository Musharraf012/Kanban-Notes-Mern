import { all } from 'redux-saga/effects';
import {
  watchNote
} from './notesSaga';

export default function* rootSaga() {
  yield all([
    watchNote()
  ]);
}