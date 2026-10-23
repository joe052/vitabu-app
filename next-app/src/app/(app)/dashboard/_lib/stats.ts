// Utility functions (private to the dashboard feature)
import type { Project } from "@/types";

/** Count projects by status for the dashboard stat cards. */
export const getProjectStats = (projects: Project[]) => ({
  total: projects.length,
  active: projects.filter((project) => project.status === "active").length,
  done: projects.filter((project) => project.status === "done").length,
});
