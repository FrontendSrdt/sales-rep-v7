export function formatDate(dateString: any) {
  const [month, day, year] = dateString.split("-");
  return `${year}-${month}-${day}`;
}
export function formatTime(time: string) {
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
