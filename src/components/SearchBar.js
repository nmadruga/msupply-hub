import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from 'material-ui/svg-icons/action/search';
import { requestSites, requestEvents } from '../actions';

const TopRow = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: row;
`;

const TextFieldStyle = styled.div`
  display: flex;
  flex: 0;
  width: 200;
  height: 100;
`;

class SearchBar extends Component {
  render() {
    const { isFetching, onRequestSites, onRequestEvents } = this.props;
    return (
      <TopRow>
        <TextField style={{ TextFieldStyle }} onChange={onRequestSites} />
        <Button class="mdc-button" onClick={onRequestEvents}>
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
  onRequestEvents: PropTypes.func.isRequired,
  onRequestSites: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    isFetching: state.sites.isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestSites: siteUUID => dispatch(requestSites(siteUUID)),
    onRequestEvents: siteUUID => dispatch(requestEvents(siteUUID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
