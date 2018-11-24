import { view, store } from "react-easy-state";
import React, { Component } from "react";
// import XLSX from "xlsx";
import styled from "styled-components";
// import state from "../../../store";
import parseExcelType1 from "./parseExcelType1";

const { dialog } = require("electron").remote;
// const fs = require("fs");

const localStore = store({
  buttonColor: "#d6dbe0"
});

const handleClick = () => {
  dialog.showOpenDialog(
    {
      properties: ["openFile"],
      filters: [
        {
          name: "Excel",
          extensions: ["xls", "XLS", "xlsx", "XLSX"]
        }
      ]
    },
    files => {
      if (files !== undefined) {
        const excelFile = files[0];
        parseExcelType1(excelFile);

        // state.setState({
        //   // statements: lines2,
        //   statementsLoaded: true
        // });
        localStore.buttonColor = "rgba(144,	238,	144, .6)";
      }
    }
  );
};

class LoadTxtStatementFile extends Component {
  render() {
    return (
      <LoadTxtButton
        buttonColor={localStore.buttonColor}
        onClick={() => handleClick()}
      >
        <p>Load Type 1 Excel File</p>
      </LoadTxtButton>
    );
  }
}

export default view(LoadTxtStatementFile);

const LoadTxtButton = styled.button`
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: ${props => props.buttonColor};
  height: 60px;
  width: 240px;
  border: 1px solid black;
  text-align: center;
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  border-radius: 4px;
  margin-right: 3px;
  margin-bottom: 3px;
  box-shadow: 0 2px 2px 0 black;

  &:hover {
    background-color: #abafb3;
    font-weight: 900;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    margin-top: 3px;
  }
`;
