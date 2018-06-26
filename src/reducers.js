import { combineReducers } from 'redux';
import {
  FETCH_EVENT_TYPES_ERROR,
  FETCH_EVENT_TYPES_SUCCESS,
  FETCH_EVENTS_ERROR,
  FETCH_EVENTS_SUCCESS,
  FETCH_SITES_ERROR,
  FETCH_SITES_SUCCESS,
  REQUEST_EVENT_TYPES,
  REQUEST_EVENTS,
  REQUEST_SITES,
  SELECT_EVENT_TYPE,
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
    case FETCH_SITES_ERROR:
    console.log('FETCH_SITES_ERROR', action);
      return {
        ...state,
        isFetching: false,
        message: action.message,
      };
    case FETCH_SITES_SUCCESS:
    console.log('FETCH_SITES_SUCCESS', action);
      return {
        ...state,
        isFetching: false,
        sitesUUIDs: action.result.map(site => site.UUID),
        message: action.message,
      };
    case REQUEST_SITES:
    console.log('REQUEST_SITES', action);
      return {
        ...state,
        isFetching: true,
      };
    case SELECT_SITE:
    console.log('SELECT_SITE', action);
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
    data: [],
    eventTypes: [],
    isFetching: false,
    message: '',
    selectedType: '',
  },
  action,
) => {
  switch (action.type) {
    case FETCH_EVENT_TYPES_ERROR:
    console.log('FETCH_EVENT_TYPES_ERROR', action);
      return {
        ...state,
        message: action.message,
      };  
    case FETCH_EVENT_TYPES_SUCCESS:
    console.log('FETCH_EVENT_TYPES_SUCCESS', action);
      return {
        ...state,
        eventTypes: action.types,
      };
    case FETCH_EVENTS_ERROR:
    console.log('FETCH_EVENTS_ERROR', action);
      return {
        ...state,
        isFetching: false,
        data: [],
        message: action.message,
      };  
    case FETCH_EVENTS_SUCCESS:
    console.log('FETCH_EVENTS_SUCCESS', action);
      return {
        ...state,
        isFetching: false,
        data: action.result,
        message: action.message,
      };
    case REQUEST_EVENT_TYPES:
      console.log('REQUEST_EVENT_TYPES', action);
        return state;  
    case REQUEST_EVENTS:
      console.log('REQUEST_EVENTS', action);
        return {
          ...state,
          isFetching: true,
        };
    case SELECT_EVENT_TYPE:
      console.log('SELECT_EVENT_TYPE', action);
        return {
          ...state,
          selectedType: action.eventType,
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
