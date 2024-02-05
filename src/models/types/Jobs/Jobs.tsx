export type Job = {
  id: number;
  userId: string;
  jobTitle: string;
  jobDescription: string;
  jobLocation: string;
  jobCompany: string;
  jobSalary: string;
};

export type AddedJob = Omit<Job, "id" | "userId">;

// export type AddedJob = {
//   jobTitle: string;
//   jobDescription: string;
//   jobLocation: string;
//   jobCompany: string;
//   jobSalary: string;
// };
