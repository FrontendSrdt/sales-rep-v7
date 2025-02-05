interface AttachedDocType {
  leadDocAttachmentId: number;
  leadNotesId: number;
  coreDocAttachmentTypeId: number;
  name: string;
  path: string;
}

interface Notes {
  leadNotesId: number;
  leadCaptureId: number;
  note: string;
  updatedAt: string;
  updatedBy: string;
  completed?: boolean;
  leadDocAttachmentDTO: AttachedDocType;
}

interface NotesData {
  [date: string]: Notes[];
}

export function transformNotesData(data: NotesData): any[] {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const startOfEarlierThisWeek = new Date(startOfWeek);
  startOfEarlierThisWeek.setDate(startOfWeek.getDate() - 7); // Start of the previous week

  const resultArray: any[] = [];
  const todayNotes: Notes[] = [];
  const yesterdayNotes: Notes[] = [];
  const earlierThisWeekNotes: Notes[] = [];
  const thisMonthNotes: Notes[] = [];
  const allMonthsWithYear: { [key: string]: Notes[] } = {}; // Notes grouped by month-year

  for (const date in data) {
    const notes = data[date];
    const noteDate = new Date(date);
    const noteMonthYear = noteDate.toLocaleString("en-US", { month: "short", year: "numeric" });

    if (noteDate.toDateString() === today.toDateString()) {
      todayNotes.push(...notes);
    } else if (noteDate.toDateString() === yesterday.toDateString()) {
      yesterdayNotes.push(...notes);
    } else if (noteDate >= startOfEarlierThisWeek && noteDate < startOfWeek) {
      earlierThisWeekNotes.push(...notes);
    } else if (noteDate >= startOfWeek && noteDate < today) {
      thisMonthNotes.push(...notes); // This week but not today or yesterday
    } else if (noteDate.getMonth() === today.getMonth() && noteDate.getFullYear() === today.getFullYear()) {
      thisMonthNotes.push(...notes);
    } else {
      if (!allMonthsWithYear[noteMonthYear]) {
        allMonthsWithYear[noteMonthYear] = [];
      }
      allMonthsWithYear[noteMonthYear].push(...notes);
    }
  }

  if (todayNotes.length) {
    resultArray.push({ group: "Today", data: todayNotes });
  }
  if (yesterdayNotes.length) {
    resultArray.push({ group: "Yesterday", data: yesterdayNotes });
  }
  if (earlierThisWeekNotes.length) {
    resultArray.push({ group: "Earlier This Week", data: earlierThisWeekNotes });
  }
  if (thisMonthNotes.length) {
    resultArray.push({ group: "This Month", data: thisMonthNotes });
  }

  for (const monthYear in allMonthsWithYear) {
    resultArray.push({ group: monthYear, data: allMonthsWithYear[monthYear] });
  }

  return resultArray;
}

