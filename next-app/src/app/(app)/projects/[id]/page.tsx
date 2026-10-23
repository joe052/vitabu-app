import type { Metadata } from "next";
import ProjectDetails from "./_components/ProjectDetails";

export const metadata: Metadata = {
  title: "Project",
};

/**
 * Dynamic route: /projects/1, /projects/2...
 * The folder name `[id]` becomes `params.id`. In Next.js 15+ `params` is a Promise, so await it.
 */
const ProjectPage = async ({ params }: PageProps<"/projects/[id]">) => {
  /**VARIABLES */
  const { id } = await params;

  /**COMPONENT */
  return <ProjectDetails id={id} />;
};

export default ProjectPage;
