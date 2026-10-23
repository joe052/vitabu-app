import type { Project } from "@/types";
import api from "./api";

/**
 * Project endpoints. Plain async functions, so they work anywhere:
 * RTK Query (store/api/projectsApi.ts), event handlers, or scripts.
 */

/** GET /projects */
export const getProjects = async () => {
  const { data } = await api.get<Project[]>("/projects");
  return data;
};

/** GET /projects/:id */
export const getProject = async (id: string) => {
  const { data } = await api.get<Project>(`/projects/${id}`);
  return data;
};
