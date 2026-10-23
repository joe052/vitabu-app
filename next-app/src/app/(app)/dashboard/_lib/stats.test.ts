import { describe, expect, it } from "vitest";
import type { Project } from "@/types";
import { getProjectStats } from "./stats";

const project = (status: Project["status"]): Project => ({
  id: status,
  name: status,
  description: "",
  status,
  updatedAt: "2026-01-01T00:00:00.000Z",
});

describe("getProjectStats", () => {
  it("counts projects by status", () => {
    const projects = [
      project("active"),
      project("active"),
      project("paused"),
      project("done"),
    ];
    expect(getProjectStats(projects)).toEqual({ total: 4, active: 2, done: 1 });
  });

  it("handles an empty list", () => {
    expect(getProjectStats([])).toEqual({ total: 0, active: 0, done: 0 });
  });
});
