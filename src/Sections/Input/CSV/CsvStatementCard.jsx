import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
// import StatementDropzone from "./DropzoneCsvStatements";
import LoadTxtStatementFile from "./LoadTxtStatementFile";

const CsvStatementCard = () => (
  <Card>
    <CardMeta>
      <CardLabel>1. Load Statements as TXT File</CardLabel>
    </CardMeta>
    <Image>
      <img
        style={{ width: "250px", height: "165px" }}
        alt="statement text"
        src="data:image/png;base64,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"
      />
    </Image>
    <LoadTxtStatementFile />
  </Card>
);

export default view(CsvStatementCard);

const Card = styled.div`
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  align-items: center;
  background-color: white;
  border: 2px solid black;
  height: 300px;
  width: 280px;
  border: 2px solid darkgray;
  border-radius: 5px;
`;

// const CardContent = styled.div`
//   height: 390px;
//   width: 240px;
//   background-color: white;
//   border: 2px solid red;
// `;

// const CardHeader = styled.div`
//   width: 100%;
//   height: 30px;
//   background-color: white;
// `;

const Image = styled.div`
  background-color: white;
  width: 260px;
  height: 160px;
  margin-bottom: 15px;
`;

const CardMeta = styled.div`
  background-color: white;
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  font-weight: bold;
`;

// const CardDescription = styled.div`
//   height: 90px;
//   width: 270px;
//   background-color: white;
//   border: 2px solid black;
// `;

const CardLabel = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  font-weight: bold;
`;
