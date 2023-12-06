import { z } from "zod";

// Define validators here and import them into client and server components
// to ensure client and server validation is always in sync

export const jobTitleValidator = z.string().min(2);
export const jobDescriptionValidator = z.string().min(2);
