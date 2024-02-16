export function getKeysAsValues(objectToTransform: { [key: string]: any }) {
  const fields: any = {};
  Object.keys(objectToTransform).forEach((key) => {
    fields[key] = key;
  });
  return fields;
}
