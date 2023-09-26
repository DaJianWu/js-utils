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
export function parseUrlParams(url: string): { [key: string]: string } {
  const params: { [key: string]: string } = {};
  const queryString = url.split('?')[1];

  if (queryString) {
    const keyValuePairs = queryString.split('&');

    keyValuePairs.forEach((pair) => {
      const [key, value] = pair.split('=');
      if (key && value) {
        params[key] = decodeURIComponent(value);
      }
    });
  }

  return params;
}
