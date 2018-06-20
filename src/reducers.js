import { combineReducers } from 'redux';
import {
  FETCH_EVENTS_ERROR,
  FETCH_EVENTS_SUCCESS,
  FETCH_SITES_ERROR,
  FETCH_SITES_SUCCESS,
  REQUEST_EVENTS,
  REQUEST_SITES,
  SELECT_SITE,
} from './actions';

const sites = (
  state = {
    isFetching: false,
    isShowingList: true,
    selectedSite: '',
    sitesUUIDs: [],
    message: '',
  },
  action,
) => {
  switch (action.type) {
    case FETCH_SITES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        sitesUUIDs: action.result.map(site => site.UUID),
        message: action.message,
      };
    case FETCH_SITES_ERROR:
      return {
        ...state,
        isFetching: false,
        message: action.message,
      };
    case REQUEST_SITES:
      return {
        ...state,
        isFetching: true,
      };
    case SELECT_SITE:
      return {
        ...state,
        selectedSite: action.siteUUID,
      };
    default:
      return state;
  }
};

const events = (
  state = {
    isFetching: false,
    message: '',
    data: [],
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_EVENTS:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.result,
        message: action.message,
      };
    case FETCH_EVENTS_ERROR:
      return {
        ...state,
        isFetching: false,
        message: action.message,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  sites,
  events,
});

export default rootReducer;
