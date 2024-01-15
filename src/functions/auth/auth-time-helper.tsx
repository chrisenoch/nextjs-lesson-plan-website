import "server-only";

//conversts the time into seconds
export function authTimeHelper({
  days,
  hours,
  minutes,
}: {
  days?: number;
  hours?: number;
  minutes?: number;
}) {
  const now = Math.floor(Date.now() / 1000);
  let totalMins = 0;
  let totalHours = 0;
  let totalDays = 0;
  if (minutes) {
    totalMins = 60 * minutes;
  }
  if (hours) {
    totalHours = 60 * 60 * hours;
  }

  if (days) {
    totalDays = 60 * 60 * 24 * days;
  }

  const seconds = totalMins + totalHours + totalDays;
  const jwtTime = now + seconds;

  return { seconds, jwtTime };
}
