import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent {
  book?: Book | null;

  constructor (
    private route: ActivatedRoute, 
    private booksService: BooksService, 
    private router: Router
  ) {};

  ngOnInit(): void{
    const isbn = this.route.snapshot.paramMap.get('id');
    if(isbn){
      this.book = this.booksService.getBookByISBN(isbn);
    }
  }

  goBack():void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
