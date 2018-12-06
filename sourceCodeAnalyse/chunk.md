# chunk
> 就像是分蛋糕，把蛋糕切成一定大小的几块。可能切到最后，剩下一块比较小。
> 运用场景：把耗时长、影响性能的任务，拆分成更小的块，来分步来完成。

## 源码注释
```
function chunk(array, size) {
  // Math.max 返回一组数中的最大值；这里保证 size 大于等于 0.
  size = Math.max(size, 0)
  const length = array == null ? 0 : array.length
  // length 为 0/undefined 或者 size 为 0 时，直接返回空数组
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  /**
   * 计算新数组的长度
   * Math.ceil 天花板函数，向上取整. 因为无法平均分割的剩下部分，将作为一个组
   */
  const result = new Array(Math.ceil(length / size))

  /**
   * 通过循环，每次通过 slice 截取 size 长度的数组
   * resIndex ++ 让数组 result 从索引 0 开始
   * index += size 保证每次都能更新 index 的值，以便下一次循环使用
   * 如果 length / size 无法平均分割，则最后 index+size 会大于数组的长度，这时 slice 会截取数组的剩余部分
   * slice 的返回值是个数组，result 结果是个二维数组
   */
  while (index < length) {
    result[resIndex++] = slice(array, index, (index += size))
  }
  return result
}
```

## 实现思路
把数组分割成几个给定大小的数组, 再把这些数组组成新的数组。
1. 分割的数组是新数组的子数组
1. 确定分成几组，也就是新数组的长度
1. 使用 slice 方法来截取每个子数组

