import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { BooksJSON } from '../models/books-json.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private books: Book[] = [];

  constructor(private http: HttpClient) { }

  private getBooksFromJSON(): Observable<BooksJSON>{
    return this.http.get<BooksJSON>(`${environment.booksJSON}`);
  }

  getBooks():  Observable<Book[]> {
    if(!this.books.length){
      return this.getBooksFromJSON().pipe(
        map((data: BooksJSON)=>{
          this.books = data.books;
          return data.books;
        })
      );
    } else {
      return of(this.books);
    }
  }

  getBookByISBN(isbn: string): Book | null {
    const book = this.books.find((book)=> book.isbn13 === isbn);
    return book ? book : null;
  }
}
