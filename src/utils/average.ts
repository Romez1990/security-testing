function average<T>(
  array: T[],
  reducer: (previousValue: number, currentValue: T) => number,
): number {
  const total = array.reduce(reducer, 0);
  return total / array.length;
}

export default average;
