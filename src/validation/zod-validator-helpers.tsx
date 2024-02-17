import { capitalizeFirstLetter } from "@/utils/string-functions";
import { ZodEffects, ZodString, z } from "zod";

/**
 *  Reduces boilerplate when you need to validate separate form fields and the entire form. You use this function in a validation function you write youself. See isAddJobValid below:
 * @example
 * function isAddJobValid(addedJobInputs: AddedJob) {
  const addedJobValidator = z.object({
    jobTitle: z.string().min(2),
    jobDescription: z.string().min(2),
    jobLocation: z.string().min(2),
    jobCompany: z.string().min(2),
    jobSalary: z.string().min(4),
  });
  const validationResult = getValidationStatuses(addedJobInputs, addedJobValidator);
  return validationResult;
}
 * @param valuesToValidate - an object representing the form fields to validate
 * @param validator - a zod validator object
 * @returns - an object which includes the validation result of all fields you entered and the entire form.
 * The return object properties depend on the input properties to valuesToValidate and are always
 * in the forrmat is<...>Valid. Also, a property of isFormValid is always returned.
 * @example
 * const valuesToValidate = {
    jobTitle:<'form value for jobTitle'>,
    jobDescription:<'form value for jobTitle'>
  };
  // returns ...
  { 
    isFormValid:boolean,
    isJobTitleValid:boolean,
    isJobDescriptionValid:boolean
  }
 * @see - components/Jobs/AddJob for usage
 * 
 */
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
  const validationResult: ValidationResult<typeof valuesToValidate> = {
    isFormValid: isFormValid,
  };

  Object.entries(valuesToValidate).forEach(
    ([validatorName, valueToValidate]) => {
      const validatorNameStr = capitalizeFirstLetter(validatorName);
      validationResult[`isFooValid`] = true;
      const validationResultKey =
        `is${validatorNameStr}Valid` as ValidatorResultKey;
      validationResult[validationResultKey] = checkFormValue(
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

export type ValidationResult<Type> = {
  [Property in keyof Type as `is${Capitalize<
    string & Property
  >}Valid`]: boolean;
};

type ValidatorResultKey = `is${Capitalize<string>}Valid`;
