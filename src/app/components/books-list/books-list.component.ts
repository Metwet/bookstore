import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent {
  @Input() books!: Book[];

  constructor (private router: Router) {};

  titleClick(isbn: string): void {
    this.router.navigate(['/book', isbn]);
  }
}
