import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';

class SiteInfoBar extends PureComponent {
  render() {
    const { sitesData, selectedSite } = this.props;
    const data = sitesData[selectedSite];

    return (
        <Grid item xs={6} md={3} style={{margin: '50px', alignContent:'center'}}>
          <div>
            <List>
              {selectedSite &&
                Object.entries(data).map(([key, value]) => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={key} secondary={value} />
                  </ListItem>
                ))}
            </List>
          </div>
        </Grid>
    );
  }
}

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
