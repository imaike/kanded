import sortBy from "lodash/sortBy";
import store from "../../../../store";

export default function getRespondentSortsExcelT1(
  sortData,
  respondentNames,
  numStatements
) {
  // generate the original load value for statement number array
  const statementNumArray = [];
  for (let i = 0; i < numStatements; i += 1) {
    statementNumArray.push(i + 1);
  }
  const testValue = statementNumArray.join(",");
  const excelType1NonsymmetricArray = [];

  // transpose data
  // todo - check to see if util transposer will work for this
  const sortDataTransposed = sortData[0].map((col, i) =>
    sortData.map(row => row[i])
  );

  const data2 = [];
  for (let p = 0; p < sortDataTransposed.length; p += 1) {
    const sortedArray1 = sortBy(sortDataTransposed[p], obj => obj.statementNum);
    data2.push(sortedArray1);
  }
  let temp2;
  let temp2a;
  const respondentDataSorts3 = [];

  for (let q = 0; q < data2.length; q += 1) {
    const temp11 = data2[q];
    const tempArray3 = [];
    const tempArray33 = [];
    for (let r = 0; r < temp11.length; r += 1) {
      temp2 = temp11[r].sortValue;
      temp2a = temp11[r].statementNum;
      tempArray3.push(temp2);
      tempArray33.push(temp2a);
    }
    respondentDataSorts3.push(tempArray3);

    // do error check for symmetry (no duplicate statement numbers)
    const respondentDataCheck = tempArray33.join(",");
    if (respondentDataCheck !== testValue) {
      excelType1NonsymmetricArray.push(respondentNames[q]);
    }

    // todo - check if this is needed?
    statementNumArray.push(tempArray33);
  }

  const excelType1NonsymmetricArrayText = excelType1NonsymmetricArray.join(",");

  store.setState({
    excelType1NonsymmetricArrayText
  });

  // let returnedValue = [respondentDataSorts3, statementNumArray];
  return [respondentDataSorts3, statementNumArray];
}
