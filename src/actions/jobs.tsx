"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { delay } from "@/utils/delay";

export async function createJob(prevState: any, formData: FormData) {
  console.log("in create job");
  console.log(formData);

  const schema = z.object({
    jobTitle: z.string().min(2),
    jobDescription: z.string().min(2),
  });

  const parse = schema.safeParse({
    jobTitle: formData.get("job-title"),
    jobDescription: formData.get("job-description"),
  });

  if (!parse.success) {
    return {
      message:
        "Failed to create job. Ensure you insert the correct form values.",
    };
  }

  const data = parse.data;

  console.log("after validation");

  try {
    await delay(() => console.log("create job completed"), 2000);
    revalidatePath("./");
    return { message: `Added job ${data.jobTitle}` };
  } catch (e) {
    revalidatePath("./");
    return { message: "Failed to create job" + e };
  }
}

export async function deleteJob(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.string().min(1),
    job: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    job: formData.get("job"),
  });

  try {
    await delay(() => console.log("delete job completed"), 2000);

    revalidatePath("./");
    return { message: `Deleted job ${data.job}` };
  } catch (e) {
    return { message: "Failed to delete job" };
  }
}
