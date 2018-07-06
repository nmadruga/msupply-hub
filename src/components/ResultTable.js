import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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
    return events.length > 0
      ? <TableBody>
        {events.map((event, index) => (
          <TableRow key={index}>
            {Object.values(event).map((value, indexElem) => {
              return {
                'number': <CustomTableCell key={indexElem} numeric>{value}</CustomTableCell>,
                'object': <CustomTableCell key={indexElem}>{JSON.stringify(value)}</CustomTableCell>
              }[typeof value] || <CustomTableCell key={indexElem}>{value}</CustomTableCell>
            })}
          </TableRow>
        ))}
      </TableBody>
      : null;
  }

  render() {
    const { events } = this.props;
    return (
      <Paper>
        <Table>
          <TableHead>{this.buildHeaders(events)}</TableHead>
          {this.buildRows(events)}
        </Table>
      </Paper>
    );
  }
}

ResultTable.propTypes = {
  events: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    events: state.events.data,
  };
};

export default connect(mapStateToProps)(ResultTable);
