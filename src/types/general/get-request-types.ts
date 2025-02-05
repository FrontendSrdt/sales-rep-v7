export interface stateValuesType {
  id: string | number;
  value: number | string; // coreStateId
  name: string | number; //name
}

export interface cityValuesType {
  id: string | number;
  value: number; // coreCityId
  name: string;
}

export interface getValuesType {
  id: string | number;
  value: number;
  name: string;
}

export interface Option {
  id: number | string;
  name: string;
}