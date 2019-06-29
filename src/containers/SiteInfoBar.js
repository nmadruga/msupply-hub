import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import GridList from '@material-ui/core/GridList';
import InputLabel from '@material-ui/core/InputLabel';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';

class SiteInfoBar extends PureComponent {

  render() {
    const { sitesData, selectedSite } = this.props;
    const data = sitesData[selectedSite];

    return(
      <div>
        <InputLabel> Site info </InputLabel>
        <GridList cellHeight={50} cols={3}>
          {selectedSite &&
                  Object.entries(data).map(([key, value]) => (
                    <ListItem key={key}>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={key} secondary={value} />
                    </ListItem>
                  ))}
        </GridList>
      </div>
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
