/** Used as references for various `Number` constants. */
// 等于 Number.MAX_SAFE_INTEGER 该常量表示在 JavaScript 中最大的安全整数。这里直接定义常量，是因为兼容性问题(IE 未实现该常量)
const MAX_SAFE_INTEGER = 9007199254740991

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * isLength(3)
 * // => true
 *
 * isLength(Number.MIN_VALUE)
 * // => false
 *
 * isLength(Infinity)
 * // => false
 *
 * isLength('3')
 * // => false
 */
// value 是否合法的类数组长度值
// value == 'number' value 需要是数值类型
// value > -1 数组索引是从 0 开始的
// value % 1 == 0 保证是整数，数组索引是整数
// value 是在安全整数内的值
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
}

export default isLength
