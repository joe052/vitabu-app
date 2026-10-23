"use client";

import { useGetProjectsQuery } from "@/store/api/projectsApi";
import { getProjectStats } from "../_lib/stats";
import StatCard from "./StatCard";

const ProjectStats = () => {
  /**VARIABLES */
  // ProjectList calls the same query: RTK Query sends just one request and shares the result.
  const { data: projects = [], isLoading } = useGetProjectsQuery();
  const stats = getProjectStats(projects);

  /**COMPONENT */
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-3">
      <StatCard
        label="Projects"
        value={stats.total}
        caption="in your workspace"
        isLoading={isLoading}
      />
      <StatCard
        label="Active"
        value={stats.active}
        caption="being worked on"
        isLoading={isLoading}
      />
      <StatCard
        label="Completed"
        value={stats.done}
        caption="shipped"
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProjectStats;
