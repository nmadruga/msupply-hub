/**
 * actions
 *
 * Definition of all actions across the app for triggering state changes.
 */

export const FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_SITES_ERROR = 'FETCH_SITES_ERROR';
export const FETCH_SITES_SUCCESS = 'FETCH_SITES_SUCCESS';
export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export const REQUEST_SITES = 'REQUEST_SITES';

export function requestSites(siteUUID) {
  return {
    type: REQUEST_SITES,
    siteUUID,
  };
}

export function fetchSitesSuccess({ message, result }) {
  return {
    type: FETCH_SITES_SUCCESS,
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

export function requestEvents(siteUUID) {
  return {
    type: REQUEST_EVENTS,
    siteUUID,
  };
}

export function fetchEventsSuccess({ message, result }) {
  return {
    type: FETCH_EVENTS_SUCCESS,
    message,
    result,
  };
}

export function fetchEventsError(errorMessage) {
  return {
    type: FETCH_EVENTS_ERROR,
    errorMessage,
  };
}
