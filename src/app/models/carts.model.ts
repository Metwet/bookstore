import { Book } from "./book.model"

export interface CartItem {
    book: Book;
    quantity: number;
}

export interface PersonalCart {
    email: string;
    items: CartItem[];
}