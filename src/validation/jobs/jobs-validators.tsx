import { z } from "zod";
import { zodValidator } from "../zod-validator";

// Define validators here and import them into client and server components
// to ensure client and server validation is always in sync

export const jobTitleValidator = z.string().min(2);
export const jobDescriptionValidator = z.string().min(2);
export const jobLocationValidator = z.string().min(2);
export const jobCompanyValidator = z.string().min(2);
export const jobSalaryValidator = z.string().min(4);

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
