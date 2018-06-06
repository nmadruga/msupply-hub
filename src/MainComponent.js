import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    //const { userId, dispatch } = this.props
    const uuid = '7E3CD6C26550489B9D89953C911C5CBC';
    this.props.onRequestSite(uuid);
  }

  render() {
    const { isFetching, sites } = this.props;

    return (
      <div>
        <div>fetching: {isFetching}</div>
        <Button onClick={this.handleClick}>Fetch</Button>
        {isFetching && <CircularProgress />}
        {sites && sites.map((site, index) => <div key={index}>{site.id}</div>)}
      </div>
    );
  }
}

MainComponent.propTypes = {
  isFetching: PropTypes.bool,
  onRequestSite: PropTypes.func.isRequired,
  sites: PropTypes.array,
};

const mapStateToProps = state => {
  console.log(state);
  return {
    isFetching: state.sites.isFetching,
    sites: state.sites.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestSite: uuid => dispatch({ type: 'REQUEST_SITES', payload: { uuid } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
