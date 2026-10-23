import { getProject, getProjects } from "@/lib/services/projects";
import type { Project } from "@/types";
import { baseApi, fromService } from "./baseApi";

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      queryFn: () => fromService(getProjects()),
      providesTags: ["Project"],
    }),
    getProject: build.query<Project, string>({
      queryFn: (id) => fromService(getProject(id)),
      providesTags: ["Project"],
    }),
  }),
});

export const { useGetProjectsQuery, useGetProjectQuery } = projectsApi;
