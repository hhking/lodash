/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * compact([0, 1, false, 2, '', 3])
 * // => [1, 2, 3]
 */
function compact(array) {
  let resIndex = 0
  const result = []

  if (array == null) {
    return result
  }

  // for...of 是 ES6 引入的遍历所有数据结构的统一方法. for...of 循环内部调用的是数据结构的 Symbol.iterator 方法 (http://es6.ruanyifeng.com/#docs/iterator#for---of-%E5%BE%AA%E7%8E%AF)
  // `false`, `null`, `0`, `""`, `undefined`, `NaN` 都是假值
  for (const value of array) {
    if (value) {
      result[resIndex++] = value
    }
  }
  return result
}

export default compact
