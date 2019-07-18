import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { ResultTable, SearchBar } from '../components';
import { SiteInfoBar } from '../containers';

const FlexDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TopDiv = styled.div`
  display flex;
  flex-wrap: wrap;
  padding: 10px;
  margin: 50px;
`;

export class Main extends PureComponent {
  render() {
    return (
      <FlexDiv>
        <TopDiv>
          <SiteInfoBar />
          <SearchBar />
        </TopDiv>
        <ResultTable />
      </FlexDiv>
    );
  }
}

export default Main;
