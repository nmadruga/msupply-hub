import React, { PureComponent } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import ResultTable from './ResultTable';

const FlexDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export class Main extends PureComponent {
  render() {
    return (
      <FlexDiv>
        <SearchBar />
        <ResultTable />
      </FlexDiv>
    );
  }
}

export default Main;
