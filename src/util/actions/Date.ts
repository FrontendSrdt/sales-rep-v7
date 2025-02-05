export const getDate = () => {
  const date = new Date();
  // Get the end date values
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const endDate = `${year}-${month}-${day}`;

  const startDateObj = new Date(date);
  startDateObj.setDate(date.getDate() - 7);

  // Get the start date values
  const startDay = startDateObj.getDate();
  const startMonth = startDateObj.getMonth() + 1;
  const startYear = startDateObj.getFullYear();
  const startDate = `${startYear}-${startMonth}-${startDay}`;

  return { startDate, endDate };
};
