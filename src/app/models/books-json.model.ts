import { Book } from "./book.model";

export interface BooksJSON {
    error: string;
    total: string;
    books: Book[];
}  