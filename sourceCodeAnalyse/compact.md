# compact

创建一个新数组，包含原数组中的所有非假值元素。`false`, `null`, `0`, `""`, `undefined`, `NaN` 都是假值。

## 源码注释
```js
function compact(array) {
  let resIndex = 0
  const result = []

  // 参数省略, `null`, `undefined` 直接返回空数组
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
```

## 核心点
- ES6 `for...of` 遍历方法
- `Iterator` 遍历器

## 参考链接
> [Iterator 和 for...of 循环](http://es6.ruanyifeng.com/#docs/iterator)
