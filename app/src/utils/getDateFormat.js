export function getDateFormat(timestamp) {
  if (!timestamp) return '';

  const date = new Date(timestamp * 1000); // timestamp is in seconds

  const options = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}
