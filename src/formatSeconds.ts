/**
 * @description 把秒数转为xx小时xx分钟
 * @author wudajian
 * @date 2023/06/20 11:06:07
 * @export
 * @param {number} seconds 秒数
 * @returns {string} xx小时xx分钟或xx秒
 * @example
 * formatSeconds(3661)
 * // => '1小时1分钟'
 */
export function formatSeconds(seconds: number): string {
  if (!seconds && seconds !== 0) {
    return '';
  }

  if (seconds < 60) {
    return `${seconds}秒`;
  }

  if (seconds < 3600) {
    return `${Math.floor(seconds / 60)}分钟`;
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const hoursText = `${hours}小时`;
  const minutesText = minutes > 0 ? `${minutes}分钟` : '';

  return hoursText + minutesText;
}
