import { z } from "zod";
import { zodValidator } from "../zod-validator";

// Define validators here and import them into client and server components
// to ensure client and server validation is always in sync

export const addedJob = z.object({
  jobTitle: z.string().min(2),
  jobDescription: z.string().min(2),
  jobLocation: z.string().min(2),
  jobCompany: z.string().min(2),
  jobSalary: z.string().min(4),
});

export function checkFormValue(zodObject, validatorName, valueToValidate) {
  const pickedZodObjectSchema = zodObject.pick({ [validatorName]: true });
  return pickedZodObjectSchema.safeParse({ [validatorName]: valueToValidate })
    .success;
}

export const jobTitleValidator = z.string().min(2);
export const jobDescriptionValidator = z.string().min(2);
export const jobLocationValidator = z.string().min(2);
export const jobCompanyValidator = z.string().min(2);
export const jobSalaryValidator = z.string().min(4);

export function isAddJobValidTwo(addedJob: {
  jobTitle: string;
  jobDescription: string;
  jobLocation: string;
  jobCompany: string;
  jobSalary: string;
}) {
  const addedJobValidator = z.object({
    jobTitle: z.string().min(2),
    jobDescription: z.string().min(2),
    jobLocation: z.string().min(2),
    jobCompany: z.string().min(2),
    jobSalary: z.string().min(4),
  });

  const validationResult = addIndividualValidationStatusesToObject(
    addedJob,
    addedJobValidator
  );

  return validationResult;
}

function addIndividualValidationStatusesToObject(
  valuesToValidate: {
    jobTitle: string;
    jobDescription: string;
    jobLocation: string;
    jobCompany: string;
    jobSalary: string;
  },
  // validationResultObject: any,
  validator: z.ZodObject<any>
) {
  const isValid = validator.safeParse(valuesToValidate).success;
  const validationResult: any = { isValid: isValid };

  Object.entries(valuesToValidate).forEach(
    ([validatorName, valueToValidate]) => {
      validationResult[validatorName.toString()] = checkFormValue(
        validator,
        validatorName,
        valueToValidate
      );
    }
  );

  return validationResult;
}

export function isAddJobValid(
  jobTitle: string,
  jobDescription: string,
  jobLocation: string,
  jobCompany: string,
  jobSalary: string
) {
  const jobTitleIsValid = zodValidator(jobTitle, {
    jobTitle: jobTitleValidator,
  });
  const jobDescriptionIsValid = zodValidator(jobDescription, {
    jobDescription: jobDescriptionValidator,
  });
  const jobLocationIsValid = zodValidator(jobLocation, {
    jobLocation: jobLocationValidator,
  });
  const jobCompanyIsValid = zodValidator(jobCompany, {
    jobCompany: jobCompanyValidator,
  });
  const jobSalaryIsValid = zodValidator(jobSalary, {
    jobSalary: jobSalaryValidator,
  });

  const isValid =
    jobTitleIsValid &&
    jobDescriptionIsValid &&
    jobLocationIsValid &&
    jobCompanyIsValid &&
    jobSalaryIsValid;
  return {
    isValid,
    jobTitleIsValid,
    jobDescriptionIsValid,
    jobLocationIsValid,
    jobCompanyIsValid,
    jobSalaryIsValid,
  };
}
