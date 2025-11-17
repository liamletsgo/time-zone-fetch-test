export type TimezoneId = "UTC" | "Asia/Tokyo" | "America/New_York" | "Europe/London";

export interface ZonedTime {
  timezone: TimezoneId;
  iso: string;
  label: string;
}

/**
 * Get the current time in the specified timezone.
 */
export function getCurrentTimeInZone(timezone: TimezoneId): ZonedTime {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const year = parts.find(p => p.type === 'year')?.value || '';
  const month = parts.find(p => p.type === 'month')?.value || '';
  const day = parts.find(p => p.type === 'day')?.value || '';
  const hour = parts.find(p => p.type === 'hour')?.value || '';
  const minute = parts.find(p => p.type === 'minute')?.value || '';
  const second = parts.find(p => p.type === 'second')?.value || '';

  const iso = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
  const label = `${iso} ${timezone}`;

  return {
    timezone,
    iso: now.toISOString(),
    label,
  };
}

/**
 * Convert an ISO timestamp string to the specified timezone.
 */
export function convertIsoToZone(iso: string, timezone: TimezoneId): ZonedTime {
  const date = new Date(iso);
  
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid ISO timestamp: ${iso}`);
  }

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const year = parts.find(p => p.type === 'year')?.value || '';
  const month = parts.find(p => p.type === 'month')?.value || '';
  const day = parts.find(p => p.type === 'day')?.value || '';
  const hour = parts.find(p => p.type === 'hour')?.value || '';
  const minute = parts.find(p => p.type === 'minute')?.value || '';
  const second = parts.find(p => p.type === 'second')?.value || '';

  const localIso = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
  const label = `${localIso} ${timezone}`;

  return {
    timezone,
    iso: date.toISOString(),
    label,
  };
}

