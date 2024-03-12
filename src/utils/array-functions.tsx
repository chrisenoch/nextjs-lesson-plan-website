export function getArrayIntersection<Type>(
  a: Array<Type>,
  b: Array<Type>
): Array<Type> {
  const intersection = a.filter((x) => b.includes(x));
  return intersection;
}

export function checkEqualityByObjectProperty(
  one: {
    [key: string]: any;
  }[],
  two: {
    [key: string]: any;
  }[],
  objectProperty: string
) {
  if (one.length !== two.length) {
    return false;
  } else {
    let count = 0;
    for (let i = 0; i < two.length; i++) {
      for (let j = 0; j < one.length; j++) {
        if (two[i][objectProperty] === one[j][objectProperty]) {
          count++;
        }
      }
    }
    if (count === one.length) {
      return true;
    } else {
      return false;
    }
  }
}
