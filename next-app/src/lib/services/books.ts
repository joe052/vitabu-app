import type { Book } from "@/types";
import api from "./api";

/** The backend wraps list responses as `{ "data": [...] }`. */
type BooksResponse = {
  data: Book[];
};

/** GET /books */
export const getBooks = async () => {
  const { data } = await api.get<BooksResponse>("/books");
  return data.data;
};
