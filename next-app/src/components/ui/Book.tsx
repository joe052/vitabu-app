"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import StateEmpty from "@/components/ui/StateEmpty";
import StateError from "@/components/ui/StateError";
import StateLoading from "@/components/ui/StateLoading";
import { toApiError } from "@/lib/services/api";
import { getBooks } from "@/lib/services/books";
import { formatDate } from "@/lib/utils";
import type { Book } from "@/types";

/**COMPONENT */
const BookComponent: React.FC = () => {
  /**VARIABLES */
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  /**Bumped by "Try again" to re-run the fetch effect */
  const [attempt, setAttempt] = useState(0);

  /**FUNCTIONS */
  useEffect(() => {
    /**Ignore a response that arrives after unmount or a newer retry */
    let ignore = false;

    getBooks()
      .then((data) => {
        if (!ignore) setBooks(data);
      })
      .catch((err) => {
        if (!ignore) {
          setError(toApiError(err).message ?? "Could not load books.");
        }
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [attempt]);

  const retry = () => {
    setIsLoading(true);
    setError(null);
    setAttempt((n) => n + 1);
  };

  /**TEMPLATE */
  if (isLoading) return <StateLoading label="Loading books..." />;
  if (error) return <StateError message={error} onRetry={retry} />;
  if (!books.length) return <StateEmpty title="No books yet" />;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <li key={book.id}>
          <Card className="h-full">
            <h3 className="font-semibold">{book.title}</h3>
            <p className="mt-1 text-sm text-brand-600 dark:text-brand-200">
              {book.author.name}
            </p>
            <p className="muted mt-3 text-sm">{book.description}</p>
            <p className="muted mt-4 text-xs">
              Added {formatDate(book.createdAt)}
            </p>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default BookComponent;
