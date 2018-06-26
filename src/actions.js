/**
 * actions
 *
 * Definition of all actions across the app for triggering state changes.
 */

export const FETCH_EVENT_TYPES_ERROR = 'FETCH_EVENTS_TYPES_ERROR';
export const FETCH_EVENT_TYPES_SUCCESS = 'FETCH_EVENTS_TYPES_SUCCESS';
export const FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_SITES_ERROR = 'FETCH_SITES_ERROR';
export const FETCH_SITES_SUCCESS = 'FETCH_SITES_SUCCESS';
export const REQUEST_EVENT_TYPES = 'REQUEST_EVENT_TYPES';
export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export const REQUEST_SITES = 'REQUEST_SITES';
export const SELECT_EVENT_TYPE = 'SELECT_EVENT_TYPE';
export const SELECT_SITE = 'SELECT_SITE';

export function fetchEventTypesError(errorMessage) {
  return {
    type: FETCH_EVENT_TYPES_ERROR,
    errorMessage,
  };
}

export function fetchEventTypesSuccess(types) {
  return {
    type: FETCH_EVENT_TYPES_SUCCESS,
    types,
  };
}

export function fetchEventsError(errorMessage) {
  return {
    type: FETCH_EVENTS_ERROR,
    errorMessage,
  };
}

export function fetchEventsSuccess({ message, result }) {
  return {
    type: FETCH_EVENTS_SUCCESS,
    message,
    result,
  };
}

export function fetchSitesError(errorMessage) {
  return {
    type: FETCH_SITES_ERROR,
    errorMessage,
  };
}

export function fetchSitesSuccess({ message, result }) {
  return {
    type: FETCH_SITES_SUCCESS,
    message,
    result,
  };
}

export function requestEventTypes() {
  return {
    type: REQUEST_EVENT_TYPES,
  };
}

export function requestEvents(query) {
  return {
    type: REQUEST_EVENTS,
    query
  };
}

export function requestSites(siteUUID) {
  return {
    type: REQUEST_SITES,
    siteUUID,
  };
}

export function selectEventType(eventType) {
  return {
    type: SELECT_EVENT_TYPE,
    eventType,
  };
}

export function selectSite(siteUUID) {
  return {
    type: SELECT_SITE,
    siteUUID,
  };
}
