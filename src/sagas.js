import { call, put, takeLatest } from 'redux-saga/effects';
import {
  REQUEST_EVENTS,
  REQUEST_SITES,
  fetchEventsError,
  fetchEventsSuccess,
  fetchSitesError,
  fetchSitesSuccess,
} from './actions';

function fetchGetApi(reddit, endpoint) {
  return fetch(`http://localhost:4000/api/v1/` + endpoint, {
    method: 'get',
    headers: new Headers({
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiaW5pdCJ9.MXidBnzVRAvNNjMXMq1a9lfIf9B278_060GvUouKMbw',
    }),
  }).then(response => response.json());
}

function* fetchSites(reddit) {
  try {
    const data = yield call(fetchGetApi, reddit, 'site');
    yield put(fetchSitesSuccess(data));
  } catch (error) {
    yield put(fetchSitesError(error.errorMessage));
  }
}

function* fetchEvents(reddit) {
  try {
    const data = yield call(fetchGetApi, reddit, 'event');
    yield put(fetchEventsSuccess(data));
  } catch (error) {
    yield put(fetchEventsError(error.errorMessage));
  }
}

function* mySaga() {
  yield takeLatest(REQUEST_SITES, fetchSites);
  yield takeLatest(REQUEST_EVENTS, fetchEvents);
}

export default mySaga;
