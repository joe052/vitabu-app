"use client";

import Link from "next/link";
import StatusBadge from "@/components/shared/StatusBadge";
import Card from "@/components/ui/Card";
import StateError from "@/components/ui/StateError";
import StateLoading from "@/components/ui/StateLoading";
import { ROUTES } from "@/constants";
import { formatDate, getErrorMessage } from "@/lib/utils";
import { useGetProjectQuery } from "@/store/api/projectsApi";

const ProjectDetails = ({ id }: { id: string }) => {
  /**VARIABLES */
  const { data: project, isLoading, error, refetch } = useGetProjectQuery(id);

  /**COMPONENT */
  return (
    <article className="max-w-3xl">
      <Link href={ROUTES.dashboard} className="muted text-sm hover:underline">
        ← All projects
      </Link>

      {isLoading ? (
        <StateLoading className="mt-6" />
      ) : error ? (
        <div className="mt-6">
          <StateError
            message={getErrorMessage(error, "Could not load this project.")}
            onRetry={refetch}
          />
        </div>
      ) : (
        project && (
          <Card
            className="mt-6"
            header={
              <div className="flex items-start justify-between gap-3">
                <h1 className="text-xl font-semibold">{project.name}</h1>
                <StatusBadge status={project.status} />
              </div>
            }
            footer={
              <p className="muted text-xs">
                Last updated {formatDate(project.updatedAt)}
              </p>
            }
          >
            <p className="muted">{project.description}</p>
          </Card>
        )
      )}
    </article>
  );
};

export default ProjectDetails;
