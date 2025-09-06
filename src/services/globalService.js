export const formatUtcToLocal = (utcDateString)=> {
  const date = new Date(utcDateString);
  
  const localDate = date.toLocaleString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
    hour12: true
  });
  return localDate;
}