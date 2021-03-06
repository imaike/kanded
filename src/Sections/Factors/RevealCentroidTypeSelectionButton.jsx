import React from "react";
import { view } from "react-easy-state";
import GeneralButton from "../../Utils/GeneralButton";
import factorState from "../GlobalState/factorState";
import { useTranslation } from "react-i18next";

function handleClick() {
  factorState.activeCentroidRevealButton = true;
  factorState.isPcaButtonDisabled = true;
  factorState.showCentroidSelection = true;
  // to allow time for the spinner to display
  factorState.isCentroidRevealButtonDisabled = true;
  // setTimeout(() => {
  // }, 100);
}

const RevealCentroidTypeSelectionButton = () => {
  const { t } = useTranslation();

  // getState
  const isActive = factorState.activeCentroidRevealButton;
  const isDisabled = factorState.isCentroidRevealButtonDisabled;
  // const isCalculating = factorState.isCentroidLoading;
  // loading={isCalculating}
  return (
    <div>
      <GeneralButton
        id="displayCentroidTypes"
        isActive={isActive}
        disabled={isDisabled}
        onClick={handleClick}
      >
        {t("Centroid Factors")}
      </GeneralButton>
    </div>
  );
};
export default view(RevealCentroidTypeSelectionButton);
