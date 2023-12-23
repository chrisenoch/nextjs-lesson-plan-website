"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { delay } from "@/utils/delay";
import {
  jobDescriptionValidator,
  jobTitleValidator,
} from "@/app/validation/jobs/jobs-validators";
import { cookies } from "next/headers";
import * as jose from "jose";
import { joseVerifyToken } from "@/functions/auth/check-permissions";

let count = 0;
export async function createJob(prevState: any, formData: FormData) {
  console.log("in create job");
  const cookieStore = cookies();
  const accessToken = cookieStore.get("jwt");
  let userId = null;
  if (accessToken) {
    try {
      const { payload } = await joseVerifyToken(accessToken.value, "my-secret");
      userId = payload.id;
      console.log("userId in jobs server action " + userId);
    } catch {
      console.log("access token verification failed in jobs server action");
      return {
        message: "Failed to create job.",
        isError: true,
        emitter: [],
      };
    }
  }

  const schema = z.object({
    jobTitle: jobTitleValidator,
    jobDescription: jobDescriptionValidator,
  });
  const jobTitle = (formData.get("job-title") as string).trim();
  const jobDescription = (formData.get("job-description") as string).trim();

  const parse = schema.safeParse({
    jobTitle,
    jobDescription,
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
    //Save to database. For now, use json-server's db.json to simulate this.
    const response = await fetch("http://localhost:3001/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        jobTitle,
        jobDescription,
      }),
    });

    const result = await response.json();
    console.log("Success:", result);

    revalidatePath("./");
    return {
      message: `Added job ${data.jobTitle}`,
      isError: false,
      emitter: [],
      payload: result,
    };
  } catch (e) {
    revalidatePath("./");
    return {
      message:
        "Failed to create job due to an error. Please contact our support team.",
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
