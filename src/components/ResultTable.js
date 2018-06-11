import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { SussolReactTable } from 'sussol-react-table';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const BottomRow = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  border: 3px solid rgba(0, 0, 0, 0.2);
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  background-color: #fefbd8;
`;

class ResultTable extends Component {
  getRows(events) {
    // TODO: Get all values from each event and set in proper table
    return events.map(event => {
      return (
        <TableRow key={`id-${event.id}`}>
          <TableCell>{event.id}</TableCell>
          <TableCell>{event.type}</TableCell>
          <TableCell>{event.pushed}</TableCell>
          <TableCell>{event.version}</TableCell>
          <TableCell>{event.expiryDate}</TableCell>
          <TableCell>{event.releaseDate}</TableCell>
          <TableCell>{event.data}</TableCell>
        </TableRow>
      );
    });
  }

  render() {
    const { events } = this.props;
    return (
      <BottomRow>
        <table width="100%" border="1">
          {events &&
            events.map((event, index) => {
              return (
                <tr>
                  <td key={`id-${index}`}>{event.id}</td>
                  <td key={`type-${index}`}>{event.type}</td>
                  <td key={`data-${index}`}>{JSON.stringify(event.data)}</td>
                </tr>
              );
            })}
        </table>
      </BottomRow>
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
