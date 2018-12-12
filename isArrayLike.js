import isLength from './isLength.js'

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * isArrayLike([1, 2, 3])
 * // => true
 *
 * isArrayLike(document.body.children)
 * // => true
 *
 * isArrayLike('abc')
 * // => true
 *
 * isArrayLike(Function)
 * // => false
 */
function isArrayLike(value) {
  /**
   * lodash 这里对类数组的定义：
   * 1. 不为 null
   * 2. 不为 `function`  (function 的 length 属性表示函数的形参个数)
   * 3. length 属性是合法类数组长度值（大于等于 0, 小于等于最大安全整数的整数）
   */
  return value != null && typeof value != 'function' && isLength(value.length)
}

export default isArrayLike
