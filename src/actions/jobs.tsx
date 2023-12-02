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
    //TO DO: delete this?
    let errors: { fieldName: string; message: string }[] = learnZod(parse);
    return {
      errors,
      message:
        "Failed to create job. Ensure you insert the correct form values.",
    };
  }

  const data = parse.data;

  try {
    await delay(() => console.log("create job completed"), 2000);
    revalidatePath("./");
    return { message: `Added job ${data.jobTitle}` };
  } catch (e) {
    revalidatePath("./");
    return { message: "Failed to create job" + e };
  }
}

function learnZod(
  parse: z.SafeParseError<{ jobTitle: string; jobDescription: string }>
) {
  console.log("zod - field with error");
  //console.log(parse.error);
  console.log("formatted");
  console.log(parse.error.format());
  console.log("********");
  console.log("parse.error.formErrors");
  console.log(parse.error.formErrors);
  console.log("-------");
  console.log(parse.error);
  let errors: { fieldName: string; message: string }[] = [];

  parse?.error?.errors?.forEach((ele) => {
    console.log(ele.path);
    errors.push({
      fieldName: ele.path[0].toString(),
      message: ele.message,
    });
  });
  return errors;
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
