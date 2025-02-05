// Define types for task data
interface Task {
  leadScheduledTaskId: number;
  subject: string;
  scheduledDate: string;
  scheduledTime: string;
  location: string;
  taskDetails: string;
  organizer: string;
  completed: boolean;
}

// Define the structure of the input data
interface TaskData {
  [date: string]: Task[]; // The data will be an object where the keys are dates (strings), and values are arrays of tasks
}

export function transformTaskData(data: TaskData): any[] {
  // Ensure data is valid
  if (!data || typeof data !== "object") {
    console.error("Invalid input data for transformTaskData");
    return [];
  }

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Start of this week (Sunday)

  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // End of this week (Saturday)

  const startOfEarlierThisWeek = new Date(startOfWeek);
  startOfEarlierThisWeek.setDate(startOfWeek.getDate() - 7); // Start of the previous week

  const resultArray: any[] = [];
  const todayTasks: Task[] = [];
  const yesterdayTasks: Task[] = [];
  const earlierThisWeekTasks: Task[] = [];
  const laterThisWeekTasks: Task[] = [];
  const thisMonthTasks: Task[] = [];
  const allMonthsWithYear: { [key: string]: Task[] } = {};

  for (const date in data) {
    const tasks = Array.isArray(data[date]) ? data[date] : []; // Ensure tasks are arrays
    const taskDate = new Date(date);
    if (isNaN(taskDate.getTime())) continue; // Skip invalid dates

    const taskMonthYear = taskDate.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

    // Add to appropriate category based on task date
    if (taskDate.toDateString() === today.toDateString()) {
      todayTasks.push(...tasks);
    } else if (taskDate.toDateString() === yesterday.toDateString()) {
      yesterdayTasks.push(...tasks);
    } else if (taskDate >= startOfEarlierThisWeek && taskDate < startOfWeek) {
      earlierThisWeekTasks.push(...tasks);
    } else if (taskDate > today && taskDate <= endOfWeek) {
      laterThisWeekTasks.push(...tasks);
    } else if (taskDate > endOfWeek && taskDate.getFullYear() === today.getFullYear() && taskDate.getMonth() === today.getMonth()) {
      thisMonthTasks.push(...tasks);
    } else {
      if (!allMonthsWithYear[taskMonthYear]) {
        allMonthsWithYear[taskMonthYear] = [];
      }
      allMonthsWithYear[taskMonthYear].push(...tasks);
    }
  }

  // Push categories into result array
  if (todayTasks.length > 0) resultArray.push({ key: "Today", tasks: todayTasks });
  if (yesterdayTasks.length > 0) resultArray.push({ key: "Yesterday", tasks: yesterdayTasks });
  if (earlierThisWeekTasks.length > 0) resultArray.push({ key: "Earlier This Week", tasks: earlierThisWeekTasks });
  if (laterThisWeekTasks.length > 0) resultArray.push({ key: "Later This Week", tasks: laterThisWeekTasks });
  if (thisMonthTasks.length > 0) resultArray.push({ key: "This Month", tasks: thisMonthTasks });

  // Transform allMonthsWithYear into an array
  const allMonthsWithYearArray = Object.keys(allMonthsWithYear).map((monthYear) => ({
    key: monthYear,
    tasks: allMonthsWithYear[monthYear],
  }));

  if (allMonthsWithYearArray.length > 0) resultArray.push(...allMonthsWithYearArray);

  return resultArray;
}

