// Wedding-related utility functions
export const formatWeddingTime = (date: Date, code: string, timeZone: string): string => {
  return date.toLocaleTimeString(code, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone,
  });
};

export const formatWeddingDate = (
  date: Date,
  code: string,
  timeZone: string,
  options: Intl.DateTimeFormatOptions
) => date.toLocaleDateString(code, { ...options, timeZone });

export const generateGoogleCalendarLink = (event: {
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
}): string => {
  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';

  const params = new URLSearchParams({
    text: event.title,
    dates: `${formatDateForGoogle(event.start)}/${formatDateForGoogle(
      event.end
    )}`,
    details: event.description || '',
    location: event.location || '',
  });

  return `${baseUrl}&${params.toString()}`;
};

const formatDateForGoogle = (date: Date): string => {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

