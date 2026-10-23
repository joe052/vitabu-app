import type { Metadata } from "next";
import BookComponent from "@/components/ui/Book";

export const metadata: Metadata = {
  title: "Books",
};

const Book = () => {
  /**TEMPLATE */
  return (
    <div className="page">
      <h1 className="text-3xl font-semibold tracking-tight">Books</h1>
      <p className="muted mt-3">Browse the books in the library.</p>

      <div className="mt-8">
        <BookComponent />
      </div>
    </div>
  );
};

export default Book;
