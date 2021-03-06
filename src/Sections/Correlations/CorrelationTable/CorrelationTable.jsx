import React, { useEffect } from "react";
import { view, store } from "react-easy-state";
import styled from "styled-components";
import { AgGridReact } from "@ag-grid-community/react";
import { AllCommunityModules } from "@ag-grid-community/all-modules";
import correlationState from "../../GlobalState/correlationState";
import coreState from "../../GlobalState/coreState";
import { useTranslation } from "react-i18next";

const clone = require("rfdc")();

const localStore = store({
  numQsorts: 0
});

function getWidth(numQsorts) {
  const width1 = correlationState.firstColMaxWidth;
  const width2 = correlationState.colMaxWidth;

  let widthVal = width1 + 10 + width2 * numQsorts;
  let x = window.innerWidth - 40 - 152;

  if (x < widthVal) {
    x += "px";
    return x;
  }
  widthVal += "px";
  return widthVal;
}

function getHeight(numQsorts) {
  let heightVal = 40 + 25 * numQsorts;
  let y = window.innerHeight - 140;
  if (y < heightVal) {
    y += "px";
    return y;
  }
  heightVal += "px";
  return heightVal;
}

function resetWidthAndHeight() {
  const numQsorts = localStore.numQsorts;
  const table = document.querySelector("#innerContainerCorrelations");
  if (table !== null) {
    table.style.height = getHeight(numQsorts);
    table.style.width = getWidth(numQsorts);
  }
}

const CorrelationTable = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.addEventListener("resize", () => {
      resetWidthAndHeight();
    });

    return () => {
      window.removeEventListener("resize", () => {
        resetWidthAndHeight();
      });
    };
  }, []);

  const gridColDefs = clone(correlationState.gridColDefs);
  const gridRowData = clone(correlationState.gridRowData);
  const numQsorts = coreState.numQsorts;
  localStore.numQsorts = numQsorts;

  const style1 = { fontWeight: "normal", marginTop: 15, textAlign: "left" };
  const style2 = { width: getWidth(numQsorts), height: getHeight(numQsorts) };

  return (
    <TableHolder>
      <p style={style1}>
        {t("Click the table headers to re-sort by column")}{" "}
        {t("(low-to-high, high-to-low, original sort)")}
      </p>
      <div
        id="innerContainerCorrelations"
        style={style2}
        className="ag-theme-fresh"
      >
        <AgGridReact
          columnDefs={gridColDefs}
          rowData={gridRowData}
          modules={AllCommunityModules}
        />
      </div>
    </TableHolder>
  );
};

export default view(CorrelationTable);

const TableHolder = styled.div``;
