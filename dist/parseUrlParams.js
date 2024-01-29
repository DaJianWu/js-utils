/**
 * @description 解析 URL 使用 ?拼接的参数
 * @author wudajian
 * @date 2023/07/14 04:07:23
 * @param {string} url
 * @returns {*}  {{ [key: string]: string }}
 * @example
 * const url = 'https://www.example.com/?name=John&age=25&city=New%20York';
 * const params = parseUrlParams(url);
 * console.log(params);
 * // =>
 * {
 *  name: 'John',
 *  age: '25',
 *  city: 'New York'
 * }
 */
export function parseUrlParams(url) {
    var params = {};
    var queryString = url.split('?')[1];
    if (queryString) {
        var keyValuePairs = queryString.split('&');
        keyValuePairs.forEach(function (pair) {
            var _a = pair.split('='), key = _a[0], value = _a[1];
            if (key && value) {
                params[key] = decodeURIComponent(value);
            }
        });
    }
    return params;
}
