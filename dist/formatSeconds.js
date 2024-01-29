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
export function formatSeconds(seconds) {
    if (!seconds && seconds !== 0) {
        return '';
    }
    if (seconds < 60) {
        return "".concat(seconds, "\u79D2");
    }
    if (seconds < 3600) {
        return "".concat(Math.floor(seconds / 60), "\u5206\u949F");
    }
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var hoursText = "".concat(hours, "\u5C0F\u65F6");
    var minutesText = minutes > 0 ? "".concat(minutes, "\u5206\u949F") : '';
    return hoursText + minutesText;
}
