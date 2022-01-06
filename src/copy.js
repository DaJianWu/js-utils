/**
 * 浏览器中复制字符到剪切板
 * @param {*} v 要复制的字符
 */
export function copy(v) {
  const input = window.document.createElement('input');
  input.value = v;
  window.document.body.appendChild(input);
  input.select();
  try {
    window.document.execCommand('copy');
    console.log('复制成功');
  } catch (error) {
    console.error(error);
  }
  window.document.body.removeChild(input);
}
