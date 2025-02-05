import { createSelector } from "reselect";
import { RootState } from "../../../store";

// COMBIED all response which need to be transformed id to name
export const selectReduxOptions = createSelector(
  (state: RootState) => state.getAllStatesData.responseForState,
  (state: RootState) => state.getAllCityDataByStateId.currentCoreCityData,
  (state: RootState) => state.getAllCityDataByStateId.coreCityData,
  (state: RootState) => state.getAllCityDataByStateId.coreCityId2Data,
  (state: RootState) => state.getAllAcademicCareer.responseForAcademicCareer,
  (state: RootState) => state.getAllAcademicProgramByCareer.academicProgramDataByCareerId,
  (state: RootState) => state.getAllCategory.responseForCategory,
  (state: RootState) => state.getAllAdmitType.responseForAdmitType,
  (state: RootState) => state.getAllTenthBoardData.responseForTenthBoard,
  (state: RootState) => state.getAllTenthMarkingSchemeData.responseForTenthMarkingScheme,
  (state: RootState) => state.getAllLeadSource.responseForLeadSource,
  (state: RootState) => state.getAllTwelfthBoardData.responseForTwelfthBoard,
  (state: RootState) => state.getAllTenthMarkingSchemeData.responseForTenthMarkingScheme,
  (state: RootState) => state.getAllTwelfthResultStatusData.responseForTwelfthResultStatus,
  (state: RootState) => state.getAllUgResultStatusData.responseForUgResultStatus,
  (
    stateOptions,
    currentCoreCityoptions,
    coreCityoptions,
    coreCityId2Options,
    CareerOptions,
    ProgramOptions,
    CategoryOptions,
    AdmitTypeOptions,
    tenthBoardOptions,
    tenthSchemeOptions,
    LeadSourceOptions,
    TwelfthBoardOptions,
    TwelfthMarketingSchemeOptions,
    TwelfthResultStatusOptions,
    UgResultStatusOptions
  ) => ({
    stateOptions,
    currentCoreCityoptions,
    coreCityoptions,
    coreCityId2Options,
    CareerOptions,
    ProgramOptions,
    CategoryOptions,
    AdmitTypeOptions,
    tenthBoardOptions,
    tenthSchemeOptions,
    LeadSourceOptions,
    TwelfthBoardOptions,
    TwelfthMarketingSchemeOptions,
    TwelfthResultStatusOptions,
    UgResultStatusOptions,
  })
);
