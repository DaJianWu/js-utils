/**
 * 获取时间段
 * @param {number} timeStamp 时间戳
 * @returns {string} 时间段
 */
export function getTimeSlot(timeStamp?: string): string {
  const now = timeStamp ? new Date(timeStamp) : new Date();
  const currentHour = now.getHours();

  if (currentHour < 6) {
    return '凌晨';
  } else if (currentHour < 9) {
    return '早上';
  } else if (currentHour < 12) {
    return '上午';
  } else if (currentHour < 14) {
    return '中午';
  } else if (currentHour < 18) {
    return '下午';
  } else if (currentHour < 24) {
    return '晚上';
  } else {
    return '';
  }
}
