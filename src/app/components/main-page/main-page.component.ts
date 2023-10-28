import { Component } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  constructor(private booksService: BooksService){}

  books: Book[] = [];

  ngOnInit(): void {
    this.booksService.getBooks().subscribe((data)=>{
      this.books = data;
    });
  }
}
