import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { requestEvents, requestEventTypes, requestSites, selectEventType, selectSite } from '../actions';

const TopRow = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: row;
  margin: 30px;
`;

class SearchBar extends Component {
  render() {
    const {
      eventTypes,
      isFetching,
      onRequestSites,
      onRequestEventTypes,
      onSelectEventType,
      onSelectSite,
      selectedSite,
      selectedType,
      sitesUUIDs,
    } = this.props;
    return (
      <TopRow>
        <InputLabel >Site</InputLabel>
        <Select
          value={selectedSite}
          onClick={onRequestSites}
          onChange={({ target }) => onSelectSite(target.value, selectedType)}
          input={<Input style={{ width: '400px' }} />}>
          {sitesUUIDs.map(site =>
            <MenuItem
              key={site}
              value={site}>
              {site}
            </MenuItem>
          )}
        </Select>
        <InputLabel >Event type</InputLabel>
        <Select
          value={selectedType}
          onClick={onRequestEventTypes}
          onChange={({ target }) => onSelectEventType(target.value, selectedSite)}
          input={<Input style={{ width: '100px' }} />}>
          {eventTypes.map(eventType =>
            <MenuItem
              key={eventType}
              value={eventType}>
              {eventType}
            </MenuItem>
          )}
        </Select>
        {isFetching && <CircularProgress />}
      </TopRow>
    );
  }
}

SearchBar.propTypes = {
  eventTypes: PropTypes.array,
  isFetching: PropTypes.bool,
  selectedSite: PropTypes.string,
  sitesUUIDs: PropTypes.array,
  onRequestEventTypes: PropTypes.func.isRequired,
  onRequestSites: PropTypes.func.isRequired,
  onSelectEventType: PropTypes.func.isRequired,
  onSelectSite: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { isFetching, selectedSite, sitesUUIDs } = state.sites;
  const { eventTypes, selectedType } = state.events;
  return {
    eventTypes,
    isFetching,
    selectedSite,
    selectedType,
    sitesUUIDs,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestEventTypes: () => dispatch(requestEventTypes()),
    onRequestSites: siteUUID => dispatch(requestSites(siteUUID)),
    onSelectEventType: (type, siteUUID) => { dispatch(selectEventType(type)); dispatch(requestEvents({ UUID: siteUUID, type })); },
    onSelectSite: (siteUUID, type) => { dispatch(selectSite(siteUUID)); dispatch(requestEvents({ UUID: siteUUID, type })); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
