import React, { ReactElement } from "react";

export interface LeadsDetailsTypes {
  icon?: React.ReactNode;
  name: string;
}

export interface ProfileIcon {
  id: number;
  icon: ReactElement;
  name?: string;
}

export interface ProfileHeader {
  name: string;
  tag: string;
  email: string;
  phone: string;
  address: string;
  icons: ProfileIcon[];
}

export interface leftViewHeaderDataType {
  id: number;
  name: string;
  number: number | string;
}

export interface leftViewDataType {
  heading: string;
  dropdownIcon: ReactElement;
  editIcon: ReactElement;
}

export interface activeHistoryType {
  id?: number;
  time: string;
  title?: string;
  message?: string | ReactElement;
  icon?: ReactElement;
  component?: ReactElement;
  bg_color?: string;
  content?: string;
  button?: string;
}

interface tableData {
  id: number;
  data1: string;
  data2: string;
  data3?: string;
}

interface tableHead {
  id: number;
  name: string;
}

export interface whatsappDataType {
  heading: string;
  tableHead: tableHead[];
  tableData: tableData[];
  activityHeading?: string;
  activityDesc: string;
}

export interface MessagePhoneDetailsDataType {
  heading: string;
  subHeading: string;
  desc: string;
  time: string;
}

export interface MessageEmailDetailsDataType {
  heading1: string;
  desc1: string;
  desc2: string;
  heading2: string;
  desc3: string;
  email: string;
}

export interface LeadPropertiesTypes {
  leadName: string;
  phone: string;
  email: string;
  careerName: string;
  programName: string;
  cityName: string;
  sessionName: string;
  sourceName: string;
  stateName: string;
}
