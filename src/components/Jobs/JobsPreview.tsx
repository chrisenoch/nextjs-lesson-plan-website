//export default function DisplayLessonplans({
//     lessonPlans,
// }: {
//   lessonPlans: {
// title: string;
// description: string;
// imageURL: string;
// imageAlt: string;
// chips: {
//     title: string;
//     category: LessonPlanType;
// }[];
// }

//{ jobs }: jobs: { id: string; title: string }[])

export function JobsPreview({
  jobs,
}: {
  jobs: { id: string; jobTitle: string; jobDescription: string }[];
}) {
  //To do: Turn the jobs into links
  const renderedJobs = jobs.map((job) => {
    return (
      <li key={job.id}>
        {job.jobTitle} {job.jobDescription}
      </li>
    );
  });

  return <ul>{renderedJobs}</ul>;
}
