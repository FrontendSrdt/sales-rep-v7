// Define types for input payload structure
type Contact = {
  contactName: string;
  contactRelation: string;
  contactNumber: string;
  primary: boolean;
  leadContactPhoneId?: string | number | null;
};

type Payload = {
  name: string;
  email: string;
  phone: string;
  leadSourceId: string;
  currentCoreStateId: string;
  currentCoreCityId: string;
  academicCareerId: string;
  academicProgramId: string;
  categoryId: string;
  admitTypeId: string;
  gender: string;
  fatherName: string;
  motherName: string;
  contact: Contact[];
  country: string;
  coreStateId: string;
  coreCityId: string;
  addressLine1: string;
  addressLine2: string;
  pin1: number;
  addressLine21: string;
  addressLine22: string;
  pin2: number;
  country2: string;
  coreStateId2: string;
  coreCityId2: string;
  address2: string;
  school: string;
  coreTenthBoardId: string;
  coreTenthMarkingSchemeId: string;
  tenthMarksOrGrade: string;
  tenth_plus_2_type: string;
  twelfthSchool: string;
  coreTwelfthBoardId: string;
  coreTwelfthResultStatus: string;
  coreTwelfthMarkingSchemeId: string;
  TwelfthMarksOrGrade: string;
  diplomaSchool: string;
  coreDiplomaBoardId: string;
  coreDiplomaResultStatus: string;
  coreDiplomaMarks: string;
  ugSchool: string;
  coreUgResultStatus: string;
  coreUgMarks: string;
  leadCaptureId?: number | string | null;
  leadAdditionalId?: number | string | null;
  contactPhoneId?: number | string | null;
  addressDetailsId1?: string | number | null;
  addressDetailsId2?: string | number | null;
  academicDetailsTwelfthId?: null | string | null;
  academicDetailsDiplomaId?: string | number | null;
  academicDetailsUGId?: number | string | null;
  academicDetailsTenthId: null | string | number;
};

type TransformedPayload = {
  personal: {
    name: string;
    email: string;
    phone: string;
    academicCareerId: string;
    academicProgramId: string;
    leadSourceId: string;
    currentCoreStateId: string;
    currentCoreCityId: string;
    coreSessionId: number;
    leadStages: any[];
    leadCaptureId?: number | string | null;
  };
  additional: {
    categoryId: string;
    admitTypeId: string;
    gender: string;
    fatherName: string;
    motherName: string;
    leadAdditionalId?: number | string | null;
  };
  contact: Contact[];
  address: {
    addressType: string;
    country: string;
    coreStateId: string;
    coreCityId: string;
    addressLine1?: string;
    addressLine2?: string;
    pin?: number | string;
   
    
    addressDetailsId1?: string | number | null;
    addressDetailsId2?: string | number | null;
  }[];
  tenthBoard: {
    school: string;
    coreTenthBoardId: string;
    coreTenthMarkingSchemeId: string;
    tenthMarksOrGrade: string;
    academicDetailsTenthId?: null | string | number;
  };
  twelfthBoard?: {
    school: string;
    twelveBoardId: string;
    twelveResultStatus: string;
    twelveMarkingSchemeId: string;
    twelveMarksOrGrade: string;
    academicDetailsTwelfthId?: null | string | null;
  };
  diploma?: {
    school: string;
    diplomaBoard: string;
    resultStatus: string;
    marks: string;
    academicDetailsDiplomaId?: string | number | null;
  };
  ug?: {
    degree: string;
    resultStatus: string;
    marks: string;
    academicDetailsUGId?: number | string | null;
  };
};

function transformPayload(payload: Payload, isModeUpdate: boolean): Partial<TransformedPayload> {
  const includeIds = (obj: any) =>
    isModeUpdate
      ? Object.entries(obj).reduce((acc, [key, value]) => {
          if (key.endsWith("Id") || value !== undefined) {
            acc[key] = value;
          }
          return acc;
        }, {} as Record<string, any>)
      : {};

  const transformedPayload: Partial<TransformedPayload> = {
    personal: {
      name: payload.name || "",
      email: payload.email || "",
      phone: payload.phone || "",
      academicCareerId: payload.academicCareerId || "",
      academicProgramId: payload.academicProgramId || "",
      leadSourceId: payload.leadSourceId || "",
      currentCoreStateId: payload.currentCoreStateId || "",
      currentCoreCityId: payload.currentCoreCityId || "",
      coreSessionId: 4,
      leadStages: [{ leadStageId: 1 }],
      ...includeIds({
        leadCaptureId: payload.leadCaptureId ?? 0,
      }),
    },
    additional: {
      categoryId: payload.categoryId || "",
      admitTypeId: payload.admitTypeId || "",
      gender: payload.gender || "",
      fatherName: payload.fatherName || "",
      motherName: payload.motherName || "",
      ...includeIds({
        leadAdditionalDetailId: payload.leadAdditionalId ?? 0,
      }),
    },
    contact: (payload.contact || []).map((contact) => ({
      contactName: contact.contactName || "",
      contactRelation: contact.contactRelation || "",
      contactNumber: contact.contactNumber || "",
      primary: contact.primary || false,
      ...includeIds({
        leadContactPhoneId: payload.contactPhoneId ?? 0,
      }),
    })),
    address: [
      {
        addressType: "PERMANENT",
        country: payload.country || "",
        coreStateId: payload.coreStateId || "",
        coreCityId: payload.coreCityId || "",
        addressLine1: payload.addressLine1 || "",
        addressLine2: payload.addressLine2 || "",
        pin: payload.pin1 || "",
        ...includeIds({
          leadAddressDetailsId: payload.addressDetailsId1 ?? 0,
        }),
      },
      {
        addressType: "CORRESPONDENCE",
        country: payload.country2 || "",
        coreStateId: payload.coreStateId2 || "",
        coreCityId: payload.coreCityId2 || "",
        addressLine1: payload.addressLine21 || "",
        addressLine2: payload.addressLine22 || "",
        pin: payload.pin1 || "",
        ...includeIds({
          leadAddressDetailsId: payload.addressDetailsId2 ?? 0,
        }),
      },
    ],
    tenthBoard: {
      school: payload.school || "",
      coreTenthBoardId: payload.coreTenthBoardId || "",
      coreTenthMarkingSchemeId: payload.coreTenthMarkingSchemeId || "",
      tenthMarksOrGrade: payload.tenthMarksOrGrade || "",
      ...includeIds({
        academicDetailsTenthId: payload.academicDetailsTenthId ?? 0,
      }),
    },
  };

  if (payload.twelfthSchool || payload.coreTwelfthBoardId || payload.coreTwelfthResultStatus || payload.coreTwelfthMarkingSchemeId || payload.TwelfthMarksOrGrade) {
    transformedPayload.twelfthBoard = {
      school: payload.twelfthSchool || "",
      twelveBoardId: payload.coreTwelfthBoardId || "",
      twelveResultStatus: payload.coreTwelfthResultStatus || "",
      twelveMarkingSchemeId: payload.coreTwelfthMarkingSchemeId || "",
      twelveMarksOrGrade: payload.TwelfthMarksOrGrade || "",
      ...includeIds({
        academicDetailsTwelfthId: payload.academicDetailsTwelfthId ?? 0,
      }),
    };
  }

  if (payload.diplomaSchool || payload.coreDiplomaBoardId || payload.coreDiplomaResultStatus || payload.coreDiplomaMarks) {
    transformedPayload.diploma = {
      school: payload.diplomaSchool || "",
      diplomaBoard: payload.coreDiplomaBoardId || "",
      resultStatus: payload.coreDiplomaResultStatus || "",
      marks: payload.coreDiplomaMarks || "",
      ...includeIds({
        academicDetailsDiplomaId: payload.academicDetailsDiplomaId ?? 0,
      }),
    };
  }

  if (payload.ugSchool || payload.coreUgResultStatus || payload.coreUgMarks) {
    transformedPayload.ug = {
      degree: payload.ugSchool || "",
      resultStatus: payload.coreUgResultStatus || "",
      marks: payload.coreUgMarks || "",
      ...includeIds({
        academicDetailsUGId: payload.academicDetailsUGId ?? 0,
      }),
    };
  }

  return transformedPayload;
}

export default transformPayload;
