"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { delay } from "@/utils/delay";
import {
  jobDescriptionValidator,
  jobTitleValidator,
} from "@/app/validation/jobs/jobs-validators";

export async function createJob(prevState: any, formData: FormData) {
  console.log("in create job");

  const schema = z.object({
    jobTitle: jobTitleValidator,
    jobDescription: jobDescriptionValidator,
  });

  const parse = schema.safeParse({
    jobTitle: (formData.get("job-title") as string).trim(),
    jobDescription: (formData.get("job-description") as string).trim(),
  });

  if (!parse.success) {
    return {
      message:
        "Failed to create job. Ensure you insert the correct form values.",
      isError: true,
      emitter: [],
    };
  }

  const data = parse.data;

  try {
    await delay(() => console.log("create job completed"), 2000);

    //save to database

    revalidatePath("./");
    return {
      message: `Added job ${data.jobTitle}`,
      isError: false,
      emitter: [],
    };
  } catch (e) {
    revalidatePath("./");
    return {
      message:
        "Failed to create job due to an error. Please contact our support team." +
        e,
      isError: true,
      emitter: [],
    };
  }
}

// export async function deleteJob(prevState: any, formData: FormData) {
//   const schema = z.object({
//     id: z.string().min(1),
//     job: z.string().min(1),
//   });
//   const data = schema.parse({
//     id: formData.get("id"),
//     job: formData.get("job"),
//   });

//   try {
//     await delay(() => console.log("delete job completed"), 2000);

//     revalidatePath("./");
//     return { message: `Deleted job ${data.job}` };
//   } catch (e) {
//     return { message: "Failed to delete job" };
//   }
// }
