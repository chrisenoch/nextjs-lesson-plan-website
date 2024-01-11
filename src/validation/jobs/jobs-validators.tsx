import { z } from "zod";
import { zodValidator } from "../zod-validator";

// Define validators here and import them into client and server components
// to ensure client and server validation is always in sync

export const jobTitleValidator = z.string().min(2);
export const jobDescriptionValidator = z.string().min(2);

export function isAddJobValid(jobTitle: string, jobDescription: string) {
  const jobTitleIsValid = zodValidator(jobTitle, {
    jobTitle: jobTitleValidator,
  });
  const jobDescriptionIsValid = zodValidator(jobDescription, {
    jobDescription: jobDescriptionValidator,
  });
  const isValid = jobTitleIsValid && jobDescriptionIsValid;
  return isValid;
}
