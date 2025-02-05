import React from "react";

interface leadStagesType {
  leadStageId: number | string;
  coreLeadStageId: number | string;
  coreLeadSubStageId: string | number;
  leadCaptureIds: Array<any>;
}

export interface ManageLeadType {
  leadCaptureId: number;
  name: string;
  email: string;
  phone: string;
  coreStateId: number;
  coreCityId: number;
  academicCareerId: number;
  careerName: string;
  programName: number;
  programDescription: string;
  leadSourceId: number;
  leadDescription: string;
  leadStageId: number;
  leadStageName: string;
  modifiedOn: string;
  stateName: string;
  cityName: string;
  leadStages: leadStagesType[];
  leadStageDescription: string;
  leadSourceName: string;
  leadSubStageDescription: string;
  coreLeadStageId: number;
  createdAt: string | any;
}


export interface ManageLeadV1Type  {
  lead_capture_id: number;
  created_at: string; 
  email: string;
  name: string;
  phone: string;
  academic_career_description: string;
  academic_program_description: string;
  city_name: string;
  state_name: string;
  lead_source_description: string;
  session_name: string;
  current_salesrep_full_name: string;
  current_lead_stage_display_name: string;
  current_lead_sub_stage_display_name: string;
  application_status_name: string | null;
};



export interface leadStageType {
  id?: string | number;
  value?: string;
  leadStageId?: number;
  name?: string;
  displayName?: string;
  status?: string;
  leadSubStage?: any;
  leadCaptures?: any;
}

export interface leadSourceType {
  id: string | number;
  value?: string;
  name?: string;
}

export interface filterLeadCaptureType {
  leadCaptureId: number;
  name: string;
  email: string;
  phone: string;
  coreStateId: number;
  coreCityId: number;
  academicCareerId: number;
  careerDescription: string;
  academicProgramId: number;
  programDescription: string;
  leadSourceId: number;
  leadDescription: string;
  leadStageId: number;
  leadStageName: string;
  modifiedOn: string;
  stateName: string;
  cityName: string;
}

export interface callingType {
  id: number;
  text: string;
  name: string;
  icon: React.ReactNode;
}

export interface options {
  id: string | number;
  value: string;
}
export interface inputsType {
  id: number;
  type: string;
  name: string;
  label: string;
  isrequired?: boolean;
  options?: options[];
  isReadOnly?: true;
}

export interface tableInputType {
  id: number;
  name: string;
  type: string;
}
interface tableHeadType {
  id: number;
  heading: string;
  tableInputs: tableInputType[];
}
export interface inputConfigTypes {
  id: number;
  groupLabel?: string;
  groupInputsConfig?: inputsType[];
  tableInputsConfig?: tableHeadType[];
}

export interface TabForCreateLeads {
  id: number;
  label: string;
  icon: string;
  contentId: string;
  contentForInput?: inputConfigTypes[];
  initialValues?: any;
  validationSchema?: any;
  contentForPreview?: any;
}
