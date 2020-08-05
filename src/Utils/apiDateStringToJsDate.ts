/**
 * The nasa apis return times in the format '2020-Jun-05 08:23'
 * To convert this string into a js Date on all platforms (viz. iPhone)
 * we need to reformat the string before passing to the Date constructor
 */
export function apiDateStringToJsDate(dateStr: string) {
  const adjustedDateStr = dateStr
    .replace(' ', 'T')
    .replace('Jan', '01')
    .replace('Feb', '02')
    .replace('Mar', '03')
    .replace('Apr', '04')
    .replace('May', '05')
    .replace('Jun', '06')
    .replace('Jul', '07')
    .replace('Aug', '08')
    .replace('Sep', '09')
    .replace('Oct', '10')
    .replace('Nov', '11')
    .replace('Dec', '12');
  return new Date(adjustedDateStr);
}
