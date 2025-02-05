// Define types for task data



export function transformActivityData(data: any): any[] {
  if (!data || !Array.isArray(data)) {
    console.error("Invalid input data for transformActivityData");
    return [];
  }

  // Normalize input data to TaskData format
  const normalizedData = data.reduce((acc: { [key: string]: any[] }, entry: any) => {
    const { date, activities } = entry;
    if (!date || !Array.isArray(activities)) return acc;

    if (!acc[date]) acc[date] = [];
    acc[date].push(...activities);
    return acc;
  }, {});

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Start of this week (Sunday)

  const startOfEarlierThisWeek = new Date(startOfWeek);
  startOfEarlierThisWeek.setDate(startOfWeek.getDate() - 7); // Start of the previous week

  const resultArray: any[] = [];
  const todayActivity: any[] = [];
  const yesterdayActivity: any[] = [];
  const earlierThisWeekActivity: any[] = [];
  const thisMonthActivity: any[] = [];
  const allMonthsWithYear: { [key: string]: any[] } = {};

  for (const date in normalizedData) {
    const activity = normalizedData[date];
    const activityDate = new Date(date);
    if (isNaN(activityDate.getTime())) continue; // Skip invalid dates

    const taskMonthYear = activityDate.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

    // Add to appropriate category based on activity date
    if (activityDate.toDateString() === today.toDateString()) {
      todayActivity.push(...activity);
    } else if (activityDate.toDateString() === yesterday.toDateString()) {
      yesterdayActivity.push(...activity);
    } else if (activityDate >= startOfEarlierThisWeek && activityDate < startOfWeek) {
      earlierThisWeekActivity.push(...activity);
    } else if (activityDate >= startOfWeek && activityDate < today) {
      thisMonthActivity.push(...activity);
    } else if (activityDate.getFullYear() === today.getFullYear() && activityDate.getMonth() === today.getMonth()) {
      thisMonthActivity.push(...activity);
    } else {
      if (!allMonthsWithYear[taskMonthYear]) {
        allMonthsWithYear[taskMonthYear] = [];
      }
      allMonthsWithYear[taskMonthYear].push(...activity);
    }
  }

  // Push categories into result array
  if (todayActivity.length > 0) resultArray.push({ key: "Today", activities: todayActivity });
  if (yesterdayActivity.length > 0) resultArray.push({ key: "Yesterday", activities: yesterdayActivity });
  if (earlierThisWeekActivity.length > 0) resultArray.push({ key: "Earlier This Week", activities: earlierThisWeekActivity });
  if (thisMonthActivity.length > 0) resultArray.push({ key: "This Month", activities: thisMonthActivity });

  // Transform allMonthsWithYear into an array
  const allMonthsWithYearArray = Object.keys(allMonthsWithYear).map((monthYear) => ({
    key: monthYear,
    activities: allMonthsWithYear[monthYear],
  }));

  if (allMonthsWithYearArray.length > 0) resultArray.push(...allMonthsWithYearArray);

  return resultArray;
}
