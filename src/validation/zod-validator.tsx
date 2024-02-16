import { capitalizeFirstLetter } from "@/utils/string-functions";
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

export function getValidationStatuses(
  valuesToValidate: {
    [key: string]: string;
  },
  validator: z.ZodObject<any>
) {
  Object.entries(valuesToValidate).forEach(
    ([validatorName, valueToValidate]) => {
      valuesToValidate[validatorName] = valueToValidate.trim();
    }
  );

  const isFormValid = validator.safeParse(valuesToValidate).success;
  const validationResult: any = { isFormValid: isFormValid };

  Object.entries(valuesToValidate).forEach(
    ([validatorName, valueToValidate]) => {
      const validatorNameStr = capitalizeFirstLetter(validatorName);
      validationResult[`is${validatorNameStr}Valid`] = checkFormValue(
        validator,
        validatorName,
        valueToValidate
      );
    }
  );

  return validationResult;
}

export function checkFormValue(
  zodObject: z.ZodObject<any>,
  validatorName: string,
  valueToValidate: string
) {
  const pickedZodObjectSchema = zodObject.pick({ [validatorName]: true });
  return pickedZodObjectSchema.safeParse({ [validatorName]: valueToValidate })
    .success;
}
