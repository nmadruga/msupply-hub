import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
    padding: '4px 5px 4px 24px'
  },
}))(TableCell);

const hidenHeaders = ['id', 'SiteUUID']

class ResultTable extends Component {
  buildHeaders(events) {
    return (
      <TableRow>
        {events.length &&
          Object.keys(events[0]).map((key, index) => {
            const title = key.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
            return <CustomTableCell key={`title-${index}`}>{title}</CustomTableCell>;
          })}
      </TableRow>
    );
  }

  buildRows(events) {
    return events.length > 0 ? (
      <TableBody>
        {events.map((event, index) => (
          <TableRow key={index}>
            {Object.values(event).map((value, indexElem) => {
              return (
                {
                  number: (
                    <CustomTableCell key={indexElem} numeric>
                      {value}
                    </CustomTableCell>
                  ),
                  object: (
                    <CustomTableCell key={indexElem}>{JSON.stringify(value)}</CustomTableCell>
                  ),
                }[typeof value] || <CustomTableCell key={indexElem}>{value}</CustomTableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    ) : null;
  }

  render() {
    const { events, message } = this.props;
    return events.length > 0 ? (
      <Grid item xs={6} md={12}>
        <Table>
          <TableHead>{this.buildHeaders(events)}</TableHead>
          {this.buildRows(events)}
        </Table>
      </Grid>
    ) : (
      <InputLabel style={{backgroundColor: 'black', color: 'white', padding: '10px', margin: '20px'}}>{message}</InputLabel>
    ) ;
  }
}

ResultTable.propTypes = {
  events: PropTypes.array,
  message: PropTypes.String,
};

const mapStateToProps = state => {
  return {
    events: state.events.data,
    message: state.events.message,
  };
};

export default connect(mapStateToProps)(ResultTable);
