import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';

const Container = styled.div`
  width: 200px;
  display: flex;
  flex-shrink:3;
  flex-direction: column;
  align-items: left;
  margin: 20px;
`;

class SiteInfoBar extends PureComponent {
    render() {
        const { sitesData, selectedSite } = this.props;
        const data = sitesData[selectedSite];

        return (
            <Container>
                {selectedSite && Object.entries(data).map(([key, value]) =>
                <InputLabel style={{ width: '200px', paddingBottom: '10px' }}>
                    {key + ': ' + value}
                </InputLabel>)}
            </Container>
        );
    }
};

SiteInfoBar.propTypes = {
    selectedSite: PropTypes.string,
    sites: PropTypes.array,
};

const mapStateToProps = state => {
    const { sitesData } = state.sites;
    const { site } = state.search;
    return {
      selectedSite: site,
      sitesData,
    };
  };

export default connect(mapStateToProps)(SiteInfoBar);