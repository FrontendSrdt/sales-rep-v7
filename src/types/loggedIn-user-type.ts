export interface loggedInUserDataType {
  enabled?: boolean;
  fullName?: string;
  email?: string;
  countryCode?: string;
  phone?: string | number;
  authority: Array<string>;
}
