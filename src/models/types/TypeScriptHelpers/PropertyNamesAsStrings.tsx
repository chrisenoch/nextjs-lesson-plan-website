export type PropertyNamesAsStrings<Type> = {
  [Property in keyof Type as Property]: Property;
};
