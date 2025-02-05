export function transformLeadBiographicalData(inputData: any) {
  return {
    personal: {
      leadCaptureId: inputData.leadCaptureId, // Default value
      name: inputData.name || "", // Mapping input name to personal.name
      email: inputData.email || "", // Mapping input email to personal.email
      phone: inputData.phone || "", // Mapping input phone to personal.phone
      academicCareerId: inputData.academicCareerId || "", // Mapping academicCareerName to academicCareerId
      academicProgramId: inputData.academicProgramId || "", // Mapping academicProgramName to academicProgramId
      leadSourceId: inputData.leadSourceId || "", // Mapping leadSourceName to leadSourceId
      currentCoreStateId: inputData.currentCoreStateId || "", // Mapping currentCoreStateName to currentCoreStateId
      currentCoreCityId: inputData.currentCoreCityId || "", // Mapping currentCoreCityName to currentCoreCityId
      coreSessionId: 4, // Static value
    },
    additional: {
      categoryId: inputData.categoryId || "", // Mapping categoryName to categoryId
      admitTypeId: inputData.admitTypeId || "", // Mapping admitTypeName to admitTypeId
      gender: inputData.gender || "", // Mapping input gender
      fatherName: inputData.fatherName || "", // Mapping fatherName
      motherName: inputData.motherName || "", // Mapping motherName
    },
  };
}

export const transformAddressData = (data: any) => {
  return {
    address: [
      {
        leadCaptureId: data.leadCaptureId, // Example static value, adjust as needed
        addressType: "CORRESPONDENCE",
        country: data.country1 || "", // Adjust based on actual data
        coreStateId: data.coreStateId || "",
        coreCityId: data.coreCityId || "",
        addressLine1: data.addressLine11,
        addressLine2: data.addressLine12,
        pin: data.pin1,
      },
      {
        leadCaptureId: data.leadCaptureId, // Example static value, adjust as needed
        addressType: "PERMANENT",
        country: data.country2 || "", // Adjust based on actual data
        coreStateId: data.coreStateId2 || "",
        coreCityId: data.coreCityId2 || "",
        addressLine1: data.addressLine21,
        addressLine2: data.addressLine22,
        pin: data.pin2,
      },
    ],
  };
};

export const transformPayloadForAcademicData = (
  data: any,
  isEnableForTwelfthInputFields: boolean,
  isEnableForDiplomaInputFields: boolean,
  leadCaptureId: number | string | undefined
) => {
  let transformPayload = {
    tenthBoard: {
      leadCaptureId: leadCaptureId,
      academicDetailsTenthId: data.academicDetailsTenthId,
      school: data.school,
      coreTenthBoardId: data.coreTenthBoardId,
      coreTenthMarkingSchemeId: data.coreTenthMarkingSchemeId,
      tenthMarksOrGrade: data.tenthMarksOrGrade,
    },
    ...(isEnableForTwelfthInputFields === true && {
      twelfthBoard: {
        leadCaptureId: leadCaptureId,
        academicDetailsTwelfthId: data.academicDetailsTwelfthId,
        school: data.twelfthSchool,
        twelveBoardId: data.coreTwelfthBoardId,
        twelveMarkingSchemeId: data.coreTwelfthMarkingSchemeId,
        twelveMarksOrGrade: data.TwelfthMarksOrGrade,
        twelveResultStatus: data.coreTwelfthResultStatus,
      },
    }),
    ...(isEnableForDiplomaInputFields === true && {
      diploma: {
        leadCaptureId: leadCaptureId,
        academicDetailsDiplomaId: data.academicDetailsDiplomaId,
        school: data.diplomaSchool,
        diplomaBoard: data.coreDiplomaBoardId,
        resultStatus: data.coreDiplomaResultStatus,
        marks: data.coreDiplomaMarks,
      },
    }),
    ug: {
      leadCaptureId: leadCaptureId,
      academicDetailsUGId: data.academicDetailsUGId,
      degree: data.ugSchool,
      resultStatus: data.coreUgResultStatus,
      marks: data.coreUgMarks,
    },
  };
  return transformPayload;
};

export const transformPayloadForInterestShown = (payload: any) => {
  const length = payload.interest.length;
  console.log(length);
  const data = payload.interest[length - 1];
  console.log(data);
  let transformedPayload = {
    leadCaptureId: data.leadCaptureId,
    coreStateId: data.currentCoreStateId,
    coreCityId: data.currentCoreCityId,
    academicCareerId: data.academicCareerId,
    academicProgramId: data.academicProgramId,
    leadSourceId: data.leadSourceId,
    status: data.active === true ? "ACTIVE" : "INACTIVE",
  };

  return transformedPayload;
};
