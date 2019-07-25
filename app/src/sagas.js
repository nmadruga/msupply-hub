import jwt from 'jsonwebtoken';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getQuery } from './selector';
import {
  REQUEST_EVENT_TAGS,
  REQUEST_EVENT_TYPES,
  REQUEST_EVENTS,
  REQUEST_SITES,
  fetchEventTagsError,
  fetchEventTagsSuccess,
  fetchEventTypesError,
  fetchEventTypesSuccess,
  fetchEventsError,
  fetchEventsSuccess,
  fetchSitesError,
  fetchSitesSuccess,
} from './actions';

function fetchGetApi(resourceUrl) {
  const hubConfig = {
    host: process.env.REACT_APP_HUB_HOST,
    port: process.env.REACT_APP_HUB_PORT,
    secret: process.env.REACT_APP_HUB_SECRET
  }

  const baseUrl = `${hubConfig.host}:${hubConfig.port}`
  const apiUrl = 'api/v1'
  const url = `${baseUrl}/${apiUrl}/${resourceUrl}`

  const auth = jwt.sign({
    'type': 'init'
  }, hubConfig.secret);

  console.log(url);
  console.log(auth);

  return fetch(url, {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${auth}`
    })
  }).then(response => response.json());
}

function* fetchSites() {
  const requestResourceUrl = 'site';
  try {
    const data = yield call(fetchGetApi, requestResourceUrl);
    console.log(data);
    yield put(fetchSitesSuccess(data));
  } catch (error) {
    yield put(fetchSitesError(error.errorMessage));
  }
}

function* fetchEventTags(action) {
  const requestResourceUrl = 'tags';
  try {
    const data = yield call(fetchGetApi, requestResourceUrl);
    let tagsAndValues = {};
    data.result.map(obj => tagsAndValues[obj.key] = obj.vals);
    yield put(fetchEventTagsSuccess(tagsAndValues));
  } catch (error) {
    yield put(fetchEventTagsError(error.errorMessage));
  }
}

function* fetchEventTypes(action) {
  const requestResourceUrl = 'event';
  try {
    const data = yield call(fetchGetApi, requestResourceUrl);
    let types = [];
    data.result.forEach(obj => { if (!types.includes(obj.type)) types.push(obj.type) });
    yield put(fetchEventTypesSuccess(types));
  } catch (error) {
    yield put(fetchEventTypesError(error.errorMessage));
  }
}

function* fetchEvents(action) {
  let requestResourceUrl = 'event';
  requestResourceUrl += yield select(getQuery);

  try {
    const data = yield call(fetchGetApi, requestResourceUrl);
    if (data.result) yield put(fetchEventsSuccess(data));
    else yield put(fetchEventsError(data.message)); 
  } catch (error) {
    yield put(fetchEventsError(error.errorMessage));
  }
}

function* mySaga() {
  yield takeLatest(REQUEST_SITES, fetchSites);
  yield takeLatest(REQUEST_EVENTS, fetchEvents);
  yield takeLatest(REQUEST_EVENT_TAGS, fetchEventTags);
  yield takeLatest(REQUEST_EVENT_TYPES, fetchEventTypes);
}

export default mySaga;
