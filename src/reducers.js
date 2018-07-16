import { combineReducers } from 'redux';
import {
  FETCH_EVENT_TAGS_ERROR,
  FETCH_EVENT_TAGS_SUCCESS,
  FETCH_EVENT_TYPES_ERROR,
  FETCH_EVENT_TYPES_SUCCESS,
  FETCH_EVENTS_ERROR,
  FETCH_EVENTS_SUCCESS,
  FETCH_SITES_ERROR,
  FETCH_SITES_SUCCESS,
  REQUEST_EVENTS,
  REQUEST_SITES,
  SELECT_EVENT_TAG_KEY,
  SELECT_EVENT_TAG_VALUE,
  SELECT_EVENT_TYPE,
  SELECT_SITE,
} from './actions';

const sites = (
  state = {
    isFetchingSites: false,
    isShowingList: true,
    sitesData: {},
    message: '',
  },
  action,
) => {
  switch (action.type) {
    case FETCH_SITES_ERROR:
      return {
        ...state,
        isFetchingSites: false,
        message: action.message,
      };
    case FETCH_SITES_SUCCESS:
      return {
        ...state,
        isFetchingSites: false,
        sitesData: action.result.reduce((obj, site) => {
          obj[site.UUID] = site.data;
           return obj;
        }, {}),
        message: action.message,
      };
    case REQUEST_SITES:
      return {
        ...state,
        isFetchingSites: true,
      };
    default:
      return state;
  }
};

const search = (
  state = {
    site: '',
    tagKey: '',
    tagValue: '',
    type: '',
  },
  action,
) => {
  switch (action.type) {
    case SELECT_SITE:
      return {
        ...state,
        site: action.siteUUID,
      };
    case SELECT_EVENT_TYPE:
      return {
        ...state,
        type: action.eventType,
      };
    case SELECT_EVENT_TAG_KEY:
      return {
        ...state,
        tagKey: action.eventTagKey,
        tagValue: '',
      }
    case SELECT_EVENT_TAG_VALUE:
      return {
        ...state,
        tagValue: action.eventTagValue,
      }
    default:
      return state;
  }
};

const events = (
  state = {
    data: [],
    eventTags: undefined,
    eventTypes: [],
    isFetchingEvents: false,
    message: '',
  },
  action,
) => {
  switch (action.type) {
    case FETCH_EVENT_TAGS_ERROR:
      return {
        ...state,
        message: action.message,
      };
    case FETCH_EVENT_TAGS_SUCCESS:
      return {
        ...state,
        eventTags: action.eventTags,
      };
    case FETCH_EVENT_TYPES_ERROR:
      return {
        ...state,
        message: action.message,
      };
    case FETCH_EVENT_TYPES_SUCCESS:
      return {
        ...state,
        eventTypes: action.types,
      };
    case FETCH_EVENTS_ERROR:
      return {
        ...state,
        data: [],
        isFetchingEvents: false,
        message: action.message,
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        data: action.result,
        isFetchingEvents: false,
        message: action.message,
      };
    case REQUEST_EVENTS:
      return {
        ...state,
        isFetchingEvents: true,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  sites,
  search,
  events,
});

export default rootReducer;
