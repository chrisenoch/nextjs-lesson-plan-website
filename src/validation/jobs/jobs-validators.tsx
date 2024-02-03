import { z } from "zod";
import { getValidationStatuses, zodValidator } from "../zod-validator";

// Define validators here and import them into client and server components
// to ensure client and server validation is always in sync

export function isAddJobValid(addedJob: {
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

  const validationResult = getValidationStatuses(addedJob, addedJobValidator);

  return validationResult;
}
