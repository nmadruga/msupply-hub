import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { requestEvents, requestEventTagKeys, requestEventTypes, requestSites, selectEventTagKey, selectEventTagValue, selectEventType, selectSite } from '../actions';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  align-items: center;
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class SearchBar extends Component {
  render() {
    const {
      eventTags,
      eventTypes,
      isFetchingEvents,
      onRequestSites,
      onRequestEventTagKeys,
      onRequestEventTypes,
      onSelectEventTagKey,
      onSelectEventTagValue,
      onSelectEventType,
      onSelectSite,
      selectedTagKey,
      selectedTagValue,
      selectedType,
      selectedSite,
      sitesUUIDs,
    } = this.props;
    return (
      <Container>
        <Row>
          <InputLabel sytle={{ textAligment: '50px' }} >Site</InputLabel>
          <Select
            value={selectedSite}
            onClick={onRequestSites}
            onChange={({ target }) => onSelectSite(target.value)}
            input={<Input style={{ width: '400px', margin: '20px' }} />}>
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
            onChange={({ target }) => onSelectEventType(target.value)}
            input={<Input style={{ width: '100px', margin: '20px' }} />}>
            {eventTypes.map(eventType =>
              <MenuItem
                key={eventType}
                value={eventType}>
                {eventType}
              </MenuItem>
            )}
          </Select>
        </Row>
        <Row>
          <InputLabel sytle={{ textAligment: '50px' }} >Tags</InputLabel>
          <Select
            value={selectedTagKey}
            onClick={onRequestEventTagKeys}
            onChange={({ target }) => onSelectEventTagKey(target.value)}
            input={<Input style={{ width: '100px', margin: '20px' }} />}>
            {eventTags.map(tag =>
              <MenuItem
                key={tag}
                value={tag}>
                {tag}
              </MenuItem>
            )}
          </Select>
          <InputLabel sytle={{ textAligment: '50px' }} >Values</InputLabel>
          <Select
            value={selectedTagValue}
            disabled={(selectedTagKey) ? true : false}
            onChange={({ target }) => onSelectEventTagValue(target.value)}
            input={<Input style={{ width: '100px', margin: '20px' }} />}>
            {selectedTagKey && eventTags[selectedTagKey].values(tagValue =>
              <MenuItem
                key={tagValue}
                value={tagValue}>
                {tagValue}
              </MenuItem>
            )}
          </Select>
        </Row>
        {isFetchingEvents && <CircularProgress />}
      </Container>
    );
  }
}

SearchBar.propTypes = {
  eventTags: PropTypes.array,
  eventTypes: PropTypes.array,
  isFetchingEvents: PropTypes.bool,
  isFetchingTags: PropTypes.bool,
  isFetchingTypes: PropTypes.bool,
  isFetchingSites: PropTypes.bool,
  selectedSite: PropTypes.string,
  selectedTagKey: PropTypes.string,
  selectedTagValue: PropTypes.string,
  selectedType: PropTypes.string,
  sitesUUIDs: PropTypes.array,
  onRequestEventTagKeys: PropTypes.func.isRequired,
  onRequestEventTypes: PropTypes.func.isRequired,
  onRequestSites: PropTypes.func.isRequired,
  onSelectEventTagKey: PropTypes.func.isRequired,
  onSelectEventTagValue: PropTypes.func.isRequired,
  onSelectEventType: PropTypes.func.isRequired,
  onSelectSite: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { selectedSite, sitesUUIDs } = state.sites;
  const { isFetchingEvents, eventTags, eventTypes, selectedTagKey, selectedTagValue, selectedType } = state.events;
  return {
    eventTags,
    eventTypes,
    isFetchingEvents,
    selectedSite,
    selectedTagKey,
    selectedTagValue,
    selectedType,
    sitesUUIDs,
  };
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    onRequestEventTagKeys: () => dispatch(requestEventTagKeys(state.siteUUID, state.type)),
    onRequestEventTypes: () => dispatch(requestEventTypes()),
    onRequestSites: siteUUID => dispatch(requestSites(siteUUID)),
    onSelectEventTagKey: tagKey => dispatch(selectEventTagKey(tagKey)),
    onSelectEventTagValue: tagValue => { dispatch(selectEventTagValue(tagValue)); dispatch(requestEvents({ UUID: state.selectedSite, type: state.selectedType, tagKey: state.selectedTagKey, tagValue })); },
    onSelectEventType: type => { dispatch(selectEventType(type)); dispatch(requestEvents({ UUID: state.selectedSite, type })); },
    onSelectSite: siteUUID => { dispatch(selectSite(siteUUID)); dispatch(requestEvents({ UUID: siteUUID, type: state.selectedType })); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
