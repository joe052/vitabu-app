"use client";

import Link from "next/link";
import StatusBadge from "@/components/shared/StatusBadge";
import Card from "@/components/ui/Card";
import StateEmpty from "@/components/ui/StateEmpty";
import StateError from "@/components/ui/StateError";
import StateLoading from "@/components/ui/StateLoading";
import { ROUTES } from "@/constants";
import { getErrorMessage } from "@/lib/utils";
import { useGetProjectsQuery } from "@/store/api/projectsApi";

const ProjectList = () => {
  /**VARIABLES */
  const { data: projects, isLoading, error, refetch } = useGetProjectsQuery();

  /**COMPONENT */
  return (
    <Card className="mt-6" title="Projects">
      {isLoading ? (
        <StateLoading label="Loading projects..." />
      ) : error ? (
        <StateError
          message={getErrorMessage(error, "Could not load projects.")}
          onRetry={refetch}
        />
      ) : !projects?.length ? (
        <StateEmpty title="No projects yet" />
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {projects.map((project) => (
            <li
              key={project.id}
              className="flex items-center justify-between gap-4 py-3"
            >
              <div className="min-w-0">
                <Link
                  href={ROUTES.project(project.id)}
                  className="font-medium hover:underline"
                >
                  {project.name}
                </Link>
                <p className="muted truncate text-sm">{project.description}</p>
              </div>
              <StatusBadge status={project.status} />
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default ProjectList;
