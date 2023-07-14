var Environment;
(function (Environment) {
    Environment["Browser"] = "browser";
    Environment["Node"] = "node";
    Environment["Unknown"] = "unknown";
})(Environment || (Environment = {}));
/**
 * @description 判断当前的运行环境
 * @author wudajian
 * @date 2023/07/12 10:07:47
 * @export
 * @returns {*}  {Environment}
 */
export function getCurrentEnvironment() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        return Environment.Browser;
    }
    else if (typeof process !== 'undefined' && process.release && process.release.name === 'node') {
        return Environment.Node;
    }
    else {
        return Environment.Unknown;
    }
}
// 示例用法
// const currentEnvironment = getCurrentEnvironment();
// console.log('当前环境:', currentEnvironment);
