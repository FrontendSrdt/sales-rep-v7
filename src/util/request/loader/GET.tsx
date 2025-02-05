import { AxiosResponse } from "axios";

import coreLeadCaptureApi from "../../../interceptor/coreLeadCaptureApi";
import coreservicesApi from "../../../interceptor/coreservicesApi";

interface AppData {
  url: string;
}
export const fetchAllLeads = async () => {
  try {
    const response: AxiosResponse<AppData> = await coreLeadCaptureApi.get("api/crm/lead/leadcapture");
    // console.log(response.data);
    return response.data;
  } catch (e: any) {
    console.error("Error while leads fetching :", e.message);
    return [];
  }
};

// fetch all lead stage
export const fetchAllLeadStage = async () => {
  try {
    const response: AxiosResponse<AppData> = await coreservicesApi.get("api/crm/core/coreleadstage");
    return response.data;
  } catch (e: any) {
    console.error("Error while lead stage fetching :", e.message);
    return [];
  }
};

// fetch all lead source
export const fetchAllLeadSource = async () => {
  try {
    const response: AxiosResponse<AppData> = await coreservicesApi.get("api/crm/core/leadsource");
    return response.data;
  } catch (e: any) {
    console.error("Error while lead source fetching :", e.message);
    return [];
  }
};

// fetch all lead additonal detials

export const fetchAllLeadAdditionalDetails = async () => {
  try {
    const response: AxiosResponse<AppData> = await coreservicesApi.get("api/crm/lead/leadadditionaldetails");
    return response.data;
  } catch (error: any) {
    console.error("Error while lead additonal details fetch :", error.message);
  }
};
// fetch all lead contact phone
export const fetchAllLeadContactPhone = async () => {
  try {
    const response: AxiosResponse<AppData> = await coreLeadCaptureApi.get("api/crm/lead/leadcontactphone");
    return response.data;
  } catch (e: any) {
    console.error("Error while lead contact phone fetching :", e.message);
    return [];
  }
};

// fetch all lead application status

export const fetchAllLeadApplicationStatus = async () => {
  try {
    const response: AxiosResponse<AppData> = await coreservicesApi.get("api/crm/lead/leadapplicationstatus");
    return response.data;
  } catch (error: any) {
    console.error("Error while lead application status fetch :", error.message);
    return [];
  }
};

// fetch all lead acad details for 12th

export const fetchAllLeadAcadDetailsTwelfth = async () => {
  try {
    const response: AxiosResponse<AppData> = await coreservicesApi.get("api/crm/lead/leadacademicdetailstwelfth");
    return response.data;
  } catch (error: any) {
    console.error("Error while lead application status fetch :", error.message);
    return [];
  }
};

// fetch all lead acad details for 12th

export const fetchAllLeadAcadDetailsUG = async () => {
  try {
    const response: AxiosResponse<AppData> = await coreservicesApi.get("api/crm/lead/leadacademicdetailsug");
    return response.data;
  } catch (error: any) {
    console.error("Error while lead application status fetch :", error.message);
    return [];
  }
};
//fetch all lead academic details for tenth
export const fetchAllLeadAcademicDetailsForTenth = async () => {
  try {
    const response: AxiosResponse<AppData> = await coreLeadCaptureApi.get("api/crm/lead/leadacademicdetailsfortenth");
    return response.data;
  } catch (e: any) {
    console.error("Error while lead academic details for tenth fetching :", e.message);
    return [];
  }
};
// fetch all lead address detail
export const fetchAllLeadAddressDetail = async () => {
  try {
    const response: AxiosResponse<AppData> = await coreservicesApi.get("api/crm/lead/leadaddressdetails");
    return response.data;
  } catch (e: any) {
    console.error("Error while lead address detail fetching :", e.message);
    return [];
  }
};
