declare enum Environment {
    Browser = "browser",
    Node = "node",
    Unknown = "unknown"
}
/**
 * @description 判断当前的运行环境
 * @author wudajian
 * @date 2023/07/12 10:07:47
 * @export
 * @returns {*}  {Environment}
 */
export declare function getCurrentEnvironment(): Environment;
export {};
