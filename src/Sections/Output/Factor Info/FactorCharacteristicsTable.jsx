import React, { Component } from "react";
import { view } from "react-easy-state";
import { AgGridReact } from "ag-grid-react";
import store from "../../../store";

// let containerStyle = {
//   marginTop: 30,
//   height: 200,
//   width: 862
// };

const getCurrentData = () => {
  let data = store.getState("factorCharacteristicsArray");
  let numFacs2 = store.getState("userSelectedFactors");
  let numFacs = numFacs2.length;

  // pull out header row
  let headerRow = data[3];

  return [data, numFacs, headerRow];
};

let gridRowDataFacCorrTable = [];
let gridColDefsFacCorrTable = [];
let characteristicsArray = [
  "No. of Defining Variables",
  "Avg. Rel. Coef.",
  "Composite Reliability",
  "S.E. of Factor Z-scores"
];

const getGridColDefsFacCorrTable = (data, numFacs, headerRow) => {
  gridColDefsFacCorrTable = [
    {
      headerName: "",
      field: "factorList",
      pinned: true,
      editable: false,
      width: 180,
      cellStyle: {
        textAlign: "center"
      }
    }
  ];

  for (let i = 1; i < numFacs + 1; i++) {
    gridColDefsFacCorrTable.push({
      headerName: headerRow[i],
      field: headerRow[i],
      pinned: false,
      editable: false,
      width: 90,
      cellStyle: {
        textAlign: "center"
      }
    }); // end push
  } // end loop

  return gridColDefsFacCorrTable;
};

const getGridRowDataFacCorrTable = (data, headerRow) => {
  gridRowDataFacCorrTable = [];

  for (let j = 4; j < data.length; j++) {
    // let responNum = j + 1;
    let tempObj = {};
    tempObj.factorList = characteristicsArray[j - 4];

    for (let k = 1; k < headerRow.length; k++) {
      tempObj[headerRow[k]] = data[j][k];
    }
    gridRowDataFacCorrTable.push(tempObj);
  }

  return gridRowDataFacCorrTable;
};

class FactorCorrelationsTable extends Component {
  onGridReady = params => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    // this.gridApi.sizeColumnsToFit();
  };

  render() {
    let currentData = getCurrentData();

    let widthVal = 182 + 90 * currentData[1];
    if (widthVal > window.innerWidth - 100) {
      widthVal = window.innerWidth - 100;
    }
    widthVal = widthVal + "px";

    let gridColDefsFacCorrTable = getGridColDefsFacCorrTable(...currentData); // store.getState("gridColDefsFacTableEigen");
    let gridRowDataFacCorrTable = getGridRowDataFacCorrTable(
      currentData[0],
      currentData[2]
    ); //store.getState("gridRowDataFacTableEigen");

    return (
      <div>
        <div
          style={{ height: 140, width: widthVal }}
          className="ag-theme-fresh"
        >
          <AgGridReact
            columnDefs={gridColDefsFacCorrTable}
            rowData={gridRowDataFacCorrTable}
            onGridReady={this.onGridReady.bind(this)}
            gridAutoHeight={true}
            enableSorting={true}
          />
        </div>
      </div>
    );
  }
}

export default view(FactorCorrelationsTable);
