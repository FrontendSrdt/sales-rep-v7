interface Option {
  id: number | string;
  name: string;
}

interface ReduxOptions {
  stateOptions: Option[];
  currentCoreCityoptions: Option[];
  CareerOptions: Option[];
  ProgramOptions: Option[];
  CategoryOptions: Option[];
  AdmitTypeOptions: Option[];
  tenthBoardOptions: Option[];
  tenthSchemeOptions: Option[];
  LeadSourceOptions: Option[];
  TwelfthBoardOptions: Option[];
  TwelfthMarketingSchemeOptions: Option[];
  TwelfthResultStatusOptions: Option[];
  UgResultStatusOptions: Option[];
  coreCityoptions: Option[];
  coreCityId2Options: Option[];
}

interface TransformedValues {
  [key: string]: string | number | undefined; // This allows the transformation to return a string, number, or undefined
}

const transformValuesToNames = (values: TransformedValues, reduxOptions: ReduxOptions): TransformedValues => {
  const transformedValues = { ...values };
  // console.log(reduxOptions);

  const {
    stateOptions,
    currentCoreCityoptions,
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
    coreCityoptions,
    coreCityId2Options,
  } = reduxOptions;

  const optionsMap: Record<string, Option[]> = {
    currentCoreStateId: stateOptions,
    currentCoreCityId: currentCoreCityoptions,
    coreCityoptions: coreCityoptions,
    coreCityId2Options: coreCityId2Options,
    academicCareerId: CareerOptions,
    academicProgramId: ProgramOptions,
    categoryId: CategoryOptions,
    admitTypeId: AdmitTypeOptions,
    coreTenthBoardId: tenthBoardOptions,
    coreTenthMarkingSchemeId: tenthSchemeOptions,
    leadSourceId: LeadSourceOptions,
    coreTwelfthBoardId: TwelfthBoardOptions,
    coreTwelfthMarkingSchemeId: TwelfthMarketingSchemeOptions,
    coreTwelfthResultStatus: TwelfthResultStatusOptions,
    ugResultStatusId: UgResultStatusOptions,

    // Additional mappings for coreStateId and coreCityId
    coreStateId: stateOptions,
    coreCityId: coreCityoptions,
    coreStateId2: stateOptions,
    coreCityId2: coreCityId2Options,
  };

  Object.keys(optionsMap).forEach((field) => {
    const options = optionsMap[field];
    const selectedId = transformedValues[field];

    if (options && selectedId) {
      const matchedOption = options.find((option) => option.id === +selectedId); // Convert selectedId to number to match id type
      if (matchedOption) {
        transformedValues[field] = matchedOption.name; // Replace ID with name
      }
    }
  });

  return transformedValues;
};

export default transformValuesToNames;
