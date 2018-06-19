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
        {events.length > 0 ? (
          Object.keys(events[0]).map(key => {
            const title = key.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
            return <CustomTableCell>{title}</CustomTableCell>;
          })
        ) : null}
      </TableRow>
    );
  }

  buildRows(events) {
    return events.length > 0
      ? events.map((event, index) => (
          <TableRow key={index}>
            {Object.values(event).map(value => {
              if (typeof value == 'number')
                return <CustomTableCell numeric>{value}</CustomTableCell>;
              if (typeof value == 'string') return <CustomTableCell>{value}</CustomTableCell>;
              if (typeof value == 'object')
                return <CustomTableCell>{JSON.stringify(value)}</CustomTableCell>;
            })}
          </TableRow>
        ))
      : null;
  }

  render() {
    const { events } = this.props;
    return (
      <Paper>
        <Table>
          <TableHead>{this.buildHeaders(events)}</TableHead>
          <TableBody>{this.buildRows(events)}</TableBody>
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
