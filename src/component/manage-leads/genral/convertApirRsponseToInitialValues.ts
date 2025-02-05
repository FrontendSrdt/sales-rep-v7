export const mapBackendResponseToInitialValues = (backendResponse: any) => {
  // Directly destructure from backendResponse, assuming the fields are flat
  const {
    name,
    email,
    phone,
    leadSourceId,
    currentCoreStateId,
    currentCoreCityId,
    academicCareerId,
    academicProgramId,
    categoryId,
    admitTypeId,
    gender,
    fatherName,
    motherName,
    contact = [], // Default to empty array if no contact is present
    school,
    coreTenthBoardId,
    coreTenthMarkingSchemeId,
    tenthMarksOrGrade,
    twelfthSchool,
    coreTwelfthBoardId,
    coreTwelfthResultStatus,
    coreTwelfthMarkingSchemeId,
    TwelfthMarksOrGrade,
    diplomaSchool,
    coreDiplomaBoard,
    coreDiplomaResultStatus,
    coreDiplomaMarks,
    ugSchool,
    coreUgResultStatus,
    coreUgMarks,
    coreStateId1,
    country,
    coreCityId1,
    addressLine21,
    addressLine22,
    pin2,
    coreCityId2,
    addressLine1,
    addressLine2,
    pin1,
    country2,
    coreStateId2,
    leadCaptureId,
    leadAdditionalId,
    addressDetailsId1,
    addressDetailsId2,
    academicDetailsTenthId,
    academicDetailsDiplomaId,
    academicDetailsTwelfthId,
    academicDetailsUGId,
  } = backendResponse;

  return {
    name: name || "",
    email: email || "",
    phone: phone || "",
    leadSourceId: leadSourceId || "",
    currentCoreStateId: currentCoreStateId || "",
    currentCoreCityId: currentCoreCityId || "",
    academicCareerId: academicCareerId || "",
    academicProgramId: academicProgramId || "",
    categoryId: categoryId || "",
    admitTypeId: admitTypeId || "",
    gender: gender || "",
    fatherName: fatherName || "",
    motherName: motherName || "",
    contact: Array.isArray(contact)
      ? contact.map((c) => ({
          contactName: c?.contactName || "",
          contactRelation: c?.contactRelation || "",
          contactNumber: c?.contactNumber || "",
          primary: c?.primary || false,
          contactPhoneId: c?.contactPhoneId || null,
        }))
      : [],
    country: country || "India",
    coreStateId: coreStateId1 || "",
    coreCityId: coreCityId1 || "",
    addressLine1: addressLine1 || "",
    addressLine2: addressLine2 || "",
    pin1: pin1 || "",
    country2: country2 || "India",
    coreStateId2: coreStateId2 || "",
    coreCityId2: coreCityId2 || "",
    addressLine21: addressLine21 || "",
    addressLine22: addressLine22 || "",
    pin2: pin2 || "",
    school: school || "",
    coreTenthBoardId: coreTenthBoardId || "",
    coreTenthMarkingSchemeId: coreTenthMarkingSchemeId || "",
    tenthMarksOrGrade: tenthMarksOrGrade || "",
    tenth_plus_2_type: twelfthSchool ? "TWELFTH" : diplomaSchool ? "DIPLOMA" : "", // Conditional logic for type
    twelfthSchool: twelfthSchool || "",
    coreTwelfthBoardId: coreTwelfthBoardId || "",
    coreTwelfthResultStatus: coreTwelfthResultStatus || "",
    coreTwelfthMarkingSchemeId: coreTwelfthMarkingSchemeId || "",
    TwelfthMarksOrGrade: TwelfthMarksOrGrade || "",
    diplomaSchool: diplomaSchool || "",
    coreDiplomaBoardId: coreDiplomaBoard || "",
    coreDiplomaResultStatus: coreDiplomaResultStatus || "",
    coreDiplomaMarks: coreDiplomaMarks || "",
    ugSchool: ugSchool || "",
    coreUgResultStatus: coreUgResultStatus || "",
    coreUgMarks: coreUgMarks || "",
    leadCaptureId: leadCaptureId || null,
    leadAdditionalId: leadAdditionalId || null,
    addressDetailsId1: addressDetailsId1 || null,
    addressDetailsId2: addressDetailsId2 || null,
    academicDetailsTenthId: academicDetailsTenthId || null,
    academicDetailsDiplomaId: academicDetailsDiplomaId || null,
    academicDetailsTwelfthId: academicDetailsTwelfthId || null,
    academicDetailsUGId: academicDetailsUGId || null,
  };
};
