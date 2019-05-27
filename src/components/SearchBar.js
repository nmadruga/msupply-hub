import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {
  requestEvents,
  requestEventTags,
  requestEventTypes,
  requestSites,
  selectEventTagKey,
  selectEventTagValue,
  selectEventType,
  selectSite,
} from '../actions';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  align-items: center;
`;

class SearchBar extends Component {
  render() {
    const {
      eventTags,
      eventTypes,
      isFetchingEvents,
      onRequestSites,
      onRequestEventTags,
      onRequestEventTypes,
      onSelectEventTagKey,
      onSelectEventTagValue,
      onSelectEventType,
      onSelectSite,
      selectedTagKey,
      selectedTagValue,
      selectedType,
      selectedSite,
      sitesData,
    } = this.props;

    return (
      <Container>
        <Row>
          <InputLabel>Site</InputLabel>
          <Select
            value={selectedSite}
            onClick={onRequestSites}
            onChange={({ target }) => onSelectSite(target.value)}
            input={<Input style={{ width: '400px', margin: '20px' }} />}
          >
            {Object.keys(sitesData).map(site => (
              <MenuItem key={site} value={site}>
                {site}
              </MenuItem>
            ))}
          </Select>
          <InputLabel>Event type</InputLabel>
          <Select
            value={selectedType}
            onClick={onRequestEventTypes}
            onChange={({ target }) => onSelectEventType(target.value)}
            input={<Input style={{ width: '100px', margin: '20px' }} />}
          >
            {eventTypes.map(eventType => (
              <MenuItem key={eventType} value={eventType}>
                {eventType}
              </MenuItem>
            ))}
          </Select>
        </Row>
        <Row>
          <InputLabel>Tags</InputLabel>
          <Select
            value={selectedTagKey}
            onClick={onRequestEventTags}
            onChange={({ target }) => onSelectEventTagKey(target.value)}
            input={<Input style={{ width: '200px', margin: '20px' }} />}
          >
            {eventTags &&
              Object.keys(eventTags).map(tag => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
          </Select>
          <InputLabel>Values</InputLabel>
          <Select
            value={selectedTagValue}
            disabled={selectedTagKey === ''}
            onChange={({ target }) => onSelectEventTagValue(target.value)}
            input={<Input style={{ width: '200px', margin: '20px' }} />}
          >
            {selectedTagKey &&
              Object.keys(eventTags[selectedTagKey]).map(tagValue => (
                <MenuItem key={tagValue} value={tagValue}>
                  {tagValue}
                </MenuItem>
              ))}
          </Select>
        </Row>
        {isFetchingEvents && <CircularProgress />}
      </Container>
    );
  }
}

SearchBar.propTypes = {
  eventTags: PropTypes.object,
  eventTypes: PropTypes.array,
  isFetchingEvents: PropTypes.bool,
  isFetchingTags: PropTypes.bool,
  isFetchingTypes: PropTypes.bool,
  isFetchingSites: PropTypes.bool,
  selectedSite: PropTypes.string,
  selectedTagKey: PropTypes.string,
  selectedTagValue: PropTypes.string,
  selectedType: PropTypes.string,
  sitesData: PropTypes.object,
  onRequestEventTags: PropTypes.func.isRequired,
  onRequestEventTypes: PropTypes.func.isRequired,
  onRequestSites: PropTypes.func.isRequired,
  onSelectEventTagKey: PropTypes.func.isRequired,
  onSelectEventTagValue: PropTypes.func.isRequired,
  onSelectEventType: PropTypes.func.isRequired,
  onSelectSite: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { sitesData } = state.sites;
  const { site, tagKey, tagValue, type } = state.search;
  const { isFetchingEvents, eventTags, eventTypes } = state.events;
  return {
    eventTags,
    eventTypes,
    isFetchingEvents,
    selectedSite: site,
    selectedTagKey: tagKey,
    selectedTagValue: tagValue,
    selectedType: type,
    sitesData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestEventTags: () => dispatch(requestEventTags()),
    onRequestEventTypes: () => dispatch(requestEventTypes()),
    onRequestSites: () => dispatch(requestSites()),
    onSelectEventTagKey: tagKey => {
      dispatch(selectEventTagKey(tagKey));
      dispatch(requestEvents());
    },
    onSelectEventTagValue: tagValue => {
      dispatch(selectEventTagValue(tagValue));
      dispatch(requestEvents());
    },
    onSelectEventType: type => {
      dispatch(selectEventType(type));
      dispatch(requestEvents());
    },
    onSelectSite: site => {
      dispatch(selectSite(site));
      dispatch(requestEvents());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);
