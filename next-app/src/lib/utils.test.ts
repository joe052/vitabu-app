import { describe, expect, it } from "vitest";
import { safeRedirect } from "./utils";

describe("safeRedirect", () => {
  it("keeps paths on this site", () => {
    expect(safeRedirect("/books")).toBe("/books");
    expect(safeRedirect("/projects/1?tab=notes")).toBe("/projects/1?tab=notes");
  });

  it("falls back for other origins and missing values", () => {
    expect(safeRedirect("https://evil.com", "/dashboard")).toBe("/dashboard");
    expect(safeRedirect("//evil.com", "/dashboard")).toBe("/dashboard");
    expect(safeRedirect("/\\evil.com", "/dashboard")).toBe("/dashboard");
    expect(safeRedirect(undefined, "/dashboard")).toBe("/dashboard");
    expect(safeRedirect(["/books"], "/dashboard")).toBe("/dashboard");
  });
});
