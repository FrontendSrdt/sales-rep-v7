export const formatPhoneNumber = (phoneNumber: any) => {
  return phoneNumber.replace(/(\d{2})(?=\d)/g, "$1 "); // Adds a space after every two digits
};



