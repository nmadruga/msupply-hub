import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import { requestSites, requestEvents, selectSite } from '../actions';

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
      selectedSite,
      sitesUUIDs,
      isFetching,
      onRequestSites,
      onRequestEvents,
      onSelectSite,
    } = this.props;
    return (
      <TopRow>
        <Select
          value={selectedSite}
          onClick={onRequestSites}
          onChange={onSelectSite}
          input={<Input style={{ width: '400px' }} />}
        >
          {sitesUUIDs.map(site => (
            <MenuItem key={site} value={site}>
              {site}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={onRequestEvents}>
          <SearchIcon />
          Search
        </Button>
        {isFetching && <CircularProgress />}
      </TopRow>
    );
  }
}

SearchBar.propTypes = {
  isFetching: PropTypes.bool,
  selectedSite: PropTypes.string,
  sitesUUIDs: PropTypes.array,
  onRequestEvents: PropTypes.func.isRequired,
  onRequestSites: PropTypes.func.isRequired,
  onSelectSite: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { selectedSite, sitesUUIDs, isFetching } = state.sites;
  return {
    selectedSite,
    sitesUUIDs,
    isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestSites: siteUUID => dispatch(requestSites(siteUUID)),
    onRequestEvents: siteUUID => dispatch(requestEvents(siteUUID)),
    onSelectSite: ({ target: { name, value } }) => dispatch(selectSite(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
