function slice(array, start, end) {
  // array == null 使用非全等，可以同时判断 null 和 undefined。 用于判断是否传参
  let length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  start = start == null ? 0 : start
  // 注意这里使用全等原因：保持和 Array.slice 规范一致，支持显示传入 'undefined' 和 'null'，并做区分
  // end 为 undefined 时，取 length 值
  // null 为：取 null，相当于 0
  end = end === undefined ? length : end

  if (start < 0) {
    start = -start > length ? 0 : (length + start)
  }
  end = end > length ? length : end
  if (end < 0) {
    end += length
  }
  // >>> 无符号右移，js 不管实际有没有移动位，符号位都会变成 0（正数）
  length = start > end ? 0 : ((end - start) >>> 0)
  start >>>= 0

  let index = -1
  const result = new Array(length)
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result
}

function chunk(array, size) {
  size = Math.max(size, 0);
  const length = array == null ? 0 : array.length;

  if (!length || size < 1) {
    return [];
  }

  let index = 0;
  let resIndex = 0;
  const result = new Array(Math.ceil(length / size));

  while (index < length) {
    result[resIndex++] = slice(array, index, (index += size));
  }

  return result;
}

let a = ['a', 'b', 'c', 'd'];

let result = chunk(a, 3);
console.log(result);
