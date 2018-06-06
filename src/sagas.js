import { call, put, takeLatest } from 'redux-saga/effects'

 function fetchSitesApi(reddit) {
    return fetch(`http://localhost:4000/api/v1/event`, { 
        method: 'get', 
        headers: new Headers({
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiaW5pdCJ9.MXidBnzVRAvNNjMXMq1a9lfIf9B278_060GvUouKMbw', 
        })})
      .then(response => response.json()
    )
  }
  
   function* fetchPosts(reddit) {
    //yield put({type: 'REQUEST_SITES', value: reddit})
    const sites = yield call(fetchSitesApi, reddit)
    yield put({type: 'RECEIVE_SITES', value: sites});
  }

function* mySaga() {
  yield takeLatest("REQUEST_SITES", fetchPosts);
}

export default mySaga;