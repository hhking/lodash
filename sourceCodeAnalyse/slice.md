# slice

> 这个方法是用来代替原生的 Array.slice 方法的。

> 原因：原生 Array.slice 是把数组当成稀疏数组处理；lodash 的 slice 是把数组当成密集数组处理。

> 详情：[issue: why not the 'baseslice' func use Array.slice(), loop faster than slice?](https://github.com/lodash/lodash/issues/2850)

## 密集数组和稀疏数组
> [JavaScript: sparse arrays vs. dense arrays](http://2ality.com/2012/06/dense-arrays.html)

## 源码注释
[slice 注释](https://github.com/hhking/lodash/blob/7ab6b07f1b128448d083d1421713e6dc27fb0b98/slice.js#L21)
```js
function slice(array, start, end) {
  // array == null 使用非全等，可以同时判断 null 和 undefined。 用于判断是否传参
  let length = array == null ? 0 : array.length
  // length 为 0 或者 undefined 时
  if (!length) {
    return []
  }
  // start 不传则默认从 0 开始
  start = start == null ? 0 : start
  // 注意这里使用全等原因：保持和 Array.slice 规范一致，支持显示传入 'undefined' 和 'null'，并做区分
  // end 为 undefined 时（显示出入 undefined 或者不传），取 length 值
  // null 为：取 null，相当于 0
  end = end === undefined ? length : end

  // start 为负数时，则表示从原数组中的倒数第几个元素开始。超出了数组长度则从 0 开始
  if (start < 0) {
    start = -start > length ? 0 : (length + start)
  }
  // end 大于数组长度，则一直到数组末尾
  end = end > length ? length : end
  // end 为负数，则表示从原数组中的倒数第几个元素结束
  // 这里没有处理 -end > length 的情况。也就是 end += length 之后 end 还是负数，超出了数组长度的情况。原因是后面还有个判断，见 #1。
  if (end < 0) {
    end += length
  }
  // >>> 无符号右移
  // js 中不管实际有没有移动位，符号位都会变成 0（正数）
  // 1. 所有非数值转换成 0
  // 2. 所有大于等于 0 等数取整数部分 (boolean 会当成 0/1 处理)

  // 截取长度：
  // #1: start > end 则截取结果数组长度 0，所以前面不需要判断 end 结果为负数的情况。
  // 其他则 end - start 来计算截取结果数组的长度，通过无符号右移保证值为正数或 0
  length = start > end ? 0 : ((end - start) >>> 0)
  start >>>= 0

  // index 从 -1 开始时因为首次循环就会赋值成 0
  let index = -1
  // result 为新数组
  const result = new Array(length)
  // 从 start 开始，截取 length 长度
  // lodash 的 slice 是把数组当成密集数组处理的，确保返回的数组是密集数组
  // 这里是通过循环索引取值的，所以如果是稀疏数组，则如果数组对应位置是没有值(empty)时，通过索引取值会返回 'undefined'，这并不表示原数组对应的值就是 undefined
  // 原生 Array.slice 方法对数组的处理方式是当成稀疏数组处理，稀疏数组得到的结果可能还是稀疏数组（empty 对应的还是 empty）
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result
}

export default slice
```

## 实现思路
创建一个数组的切片：
1. 生成新的数组
2. 新数组的长度
3. 从原数组中，截取出一定长度的新数组
4. 通过循环赋值新数组，保证生成的是密集数组

## 核心点
- 密集数组和稀疏数组
- 判断参数是否忽略的技巧 (`== null`)
- `>>>` 无符号右移及其使用技巧
