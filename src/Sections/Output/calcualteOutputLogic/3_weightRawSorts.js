import zip from "lodash/zip";
import map from "lodash/map";
import store from "../../../store";
import average from "../../../Utils/average";
import evenRound from "../../../Utils/evenRound";
import standardDeviation from "../../../Utils/standardDeviation";

function weightRawSorts(significantFactors) {
  // produces MD array with factor number, flagged respondent, weighted values for each statement (for each flagged respondent)
  const respondentNames = store.getState("respondentNames");
  const mainDataObject = store.getState("mainDataObject");
  // pos shifted
  const rawSorts = [];
  for (let k = 0, kLen = mainDataObject.length; k < kLen; k++) {
    rawSorts.push(mainDataObject[k].posShiftSort);
  }

  const weightedSorts = [];
  // normalize weights by sort
  const normalizedSorts = [];
  for (let s = 0, sLen = rawSorts.length; s < sLen; s++) {
    const tempArray2a = [];
    const sortAverage = average(rawSorts[s]);
    const sortStandardDeviation = standardDeviation(rawSorts[s]);
    for (let r = 0, rLen = rawSorts[s].length; r < rLen; r++) {
      const zScore = evenRound(
        (rawSorts[s][r] - sortAverage) / sortStandardDeviation,
        3
      );
      tempArray2a.push(zScore);
    }
    normalizedSorts.push(tempArray2a);
  }
  const rawSortsPrep = zip(respondentNames, normalizedSorts);

  // multiply normaized sorts by weighting value
  let temp4;
  for (let i = 0, iLen = significantFactors.length; i < iLen; i++) {
    for (let j = 0, jLen = rawSortsPrep.length; j < jLen; j++) {
      const temp1 = significantFactors[i][1];
      const temp2 = rawSortsPrep[j][0];
      const temp3 = rawSortsPrep[j][1];
      temp4 = significantFactors[i][3];
      const tempArray = [];
      if (temp1 === temp2) {
        const newWeightedSort = map(temp3, roundNumbers);
        // push factor number
        tempArray.push(significantFactors[i][0]);
        // push respondent name
        tempArray.push(temp1);
        tempArray.push(newWeightedSort);
        weightedSorts.push(tempArray);
      }
    }
  }
  return weightedSorts;

  function roundNumbers(n) {
    const temp5 = evenRound(n * temp4, 5);
    return temp5;
  }
}

export default weightRawSorts;