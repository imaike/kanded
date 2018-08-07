import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import KandedCard from "./Kanded/ExcelT3Card";
// import ExcelT1Card from "./Excel/ExcelT1Card";
// import ExcelT2Card from "./Excel/ExcelT2Card";

class ExcelPanel extends Component {
  render() {
    return (
      <DataWindow>
        <Header>
          Load a KANDED or Ken-Q Analysis (web) Excel output file.
        </Header>
        <CardHolder>
          <KandedCard />
        </CardHolder>
      </DataWindow>
    );
  }
}

export default view(ExcelPanel);

const DataWindow = styled.div`
  height: 100%;
  background-color: white;
`;

const CardHolder = styled.div`
  display: grid;
  grid-template-columns: 350px 350px;
  grid-template-rows: 320px 115px 120px 130px;
`;

const Header = styled.div`
  font-family: Helvetica;
  font-size: 22px;
  font-weight: bold;
  height: 30px;
  margin-top: 10px;
`;
