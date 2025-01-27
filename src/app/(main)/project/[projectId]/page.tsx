const ProjectIdPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const projectId = (await params).projectId;
  return <div>{projectId}</div>;
};
export default ProjectIdPage;
