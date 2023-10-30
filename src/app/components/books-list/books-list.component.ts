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

  isCardView: boolean = false;
  isTableView: boolean = true;

  constructor (private router: Router) {};

  titleClick(isbn: string): void {
    this.router.navigate(['/book', isbn]);
  }

  switchToCardView(){
    this.isCardView = true;
    this.isTableView = false;
  }

  switchToTableView(){
    this.isCardView = false;
    this.isTableView = true;
  }
}
