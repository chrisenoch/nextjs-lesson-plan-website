//I know Set.prototype.intersection() exists, but it is not available in modern browsersas of 2023.
export function getSetIntersection<Type>(
  a: Set<Type>,
  b: Set<Type>
): Set<Type> {
  const intersection = new Set(Array.from(a).filter((x) => b.has(x)));
  return intersection;
}
