export function getArrayIntersection<Type>(
  a: Array<Type>,
  b: Array<Type>
): Array<Type> {
  const intersection = a.filter((x) => b.includes(x));
  return intersection;
}
