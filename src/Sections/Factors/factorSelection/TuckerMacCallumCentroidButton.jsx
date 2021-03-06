import styled from "styled-components";
import { view } from "react-easy-state";
import React from "react";
import GeneralButton from "../../../Utils/GeneralButton";
import factorState from "../../GlobalState/factorState";
import tuckerDispatcher from "../centroidLogic/tuckerLogic/tuckerDispatcher";
import appState from "../../GlobalState/appState";
import { useTranslation } from "react-i18next";

const TuckerMacCallumCentroidButton = () => {
  const { t } = useTranslation();

  const handleOnclick = event => {
    factorState.showCentroidSpinner = true;

    tuckerDispatcher();

    // factorState.numFacsForTableWidth = numFactors;
    factorState.activeTuckerMacCallumCentroidButton = true;

    factorState.showCentroidSpinner = false;

    factorState.showUnrotatedFactorTable = true;
    factorState.showEigenvaluesTable = true;
    factorState.showScreePlot = true;
    factorState.showKeepFacForRotButton = true;

    // factorState.activeCentroidRevealButton = true;
    factorState.disabledCentroidFactorButton = true;

    factorState.isPcaButtonDisabled = true;
    appState.isFactorsButtonGreen = true;
    factorState.isTraditionalCentroidDisabled = true;
    factorState.isHorst55Disabled = true;
    factorState.isTuckerMacCallumCentroidDisabled = true;
    factorState.TuckerMacCallumCentroidButton = true;
    factorState.isCentroidFacSelectDisabled = true;
  };

  // getState
  const isActive = factorState.activeTuckerMacCallumCentroidButton;
  const isDisabled = factorState.isTuckerMacCallumCentroidDisabled;
  // const isCentroidLoading = factorState.isCentroidLoading;

  return (
    <TuckerButton
      id="tuckerButton"
      isActive={isActive}
      disabled={isDisabled}
      onClick={handleOnclick}
    >
      Tucker and MacCallum <br /> {t("Centroid Factors")}
    </TuckerButton>
  );
};

export default view(TuckerMacCallumCentroidButton);

const TuckerButton = styled(GeneralButton)`
  margin-right: 5px;
`;
