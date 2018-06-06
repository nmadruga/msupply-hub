import { combineReducers } from 'redux'
// import {
//   SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
//   REQUEST_POSTS, RECEIVE_POSTS
// } from '../actions'

const fetchSites = (state = {
    isFetching: false,
    message: '',
    data: []
  }, action) => {
    switch (action.type) {
      case 'REQUEST_SITES':
        return {
          ...state,
          isFetching: true,
        }
      case 'RECEIVE_SITES':
        return {
          ...state,
          isFetching: false,
          data: action.value.result,
          //lastUpdated: action.receivedAt
          message: action.value.message
        }
      default:
        return state
    }
  }

const rootReducer = combineReducers({
  sites: fetchSites 
})

export default rootReducer
