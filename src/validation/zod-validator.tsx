import { ZodEffects, ZodString, z } from "zod";

export function zodValidator(
  valueToValidate: string,
  validator: {
    [key: string]: z.ZodString | ZodEffects<ZodString, string, string>;
  },
  shouldTrim: boolean = true
) {
  if (Object.keys(validator).length > 1) {
    console.error(
      "Only one key should be passed to the validator object. Extra keys will be ignored."
    );
  }

  if (shouldTrim) {
    valueToValidate = valueToValidate.trim();
  }

  return z.object(validator).safeParse({
    [Object.keys(validator)[0]]: valueToValidate,
  }).success;
}
