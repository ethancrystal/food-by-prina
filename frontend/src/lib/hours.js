import { ALWAYS_OPEN, HOURS, TIMEZONE } from '@/data/menu';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

export const formatTime = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
};

// Current day index and minutes-past-midnight in the business's timezone.
function nowInTz(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (t) => parts.find((p) => p.type === t)?.value;
  return {
    day: DAY_NAMES.indexOf(get('weekday')),
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  };
}

// Returns { open, label, detail } e.g. "Open with a smile" / "Closes 8:00 PM".
export function getStoreStatus(date = new Date()) {
  if (ALWAYS_OPEN) {
    return { open: true, label: 'Open with a smile', detail: 'Text us anytime to order' };
  }

  const { day, minutes } = nowInTz(date);
  const today = HOURS[day];

  if (today.open && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { open: true, label: 'Open with a smile', detail: `Closes ${formatTime(today.close)}` };
  }

  // Find the next opening, starting later today.
  for (let i = 0; i < 7; i += 1) {
    const d = (day + i) % 7;
    const h = HOURS[d];
    if (!h.open) continue;
    if (i === 0 && minutes >= toMinutes(h.open)) continue;
    const when = i === 0 ? 'today' : i === 1 ? 'tomorrow' : DAY_NAMES[d].slice(0, 3);
    return { open: false, label: 'Closed', detail: `Opens ${when} at ${formatTime(h.open)}` };
  }
  return { open: false, label: 'Closed', detail: 'Text us to order ahead' };
}

export function todayIndex(date = new Date()) {
  return nowInTz(date).day;
}
