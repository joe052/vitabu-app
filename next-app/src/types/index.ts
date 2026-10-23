// Shared TypeScript types. Keep these in sync with your backend's API responses.

export type User = {
  id: string;
  name: string;
  email: string;
};

export type ProjectStatus = "active" | "paused" | "done";

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  updatedAt: string;
};

export type Author = {
  id: string;
  name: string;
};

export type Book = {
  id: string;
  title: string;
  description: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = LoginRequest & {
  name: string;
};
