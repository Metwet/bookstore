import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit{
  constructor(private booksService: BooksService){}

  books: Book[] = [];
  originBooks: Book[] = [];

  ngOnInit(): void {
    this.booksService.getBooks().subscribe((data)=>{
      this.books = data;
      this.originBooks = data;
    });
  }

  isTitleSortedAscending: boolean = true;
  isPriceSortedAscending: boolean = true;
  searchQuery: string = '';

  sortBooksByTitle(){
    this.isTitleSortedAscending = !this.isTitleSortedAscending;
    this.books.sort((a, b)=>{
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      const direction = this.isTitleSortedAscending ? -1 : 1;
      if (titleA < titleB) {
        return -1 * direction;
      }
      if (titleA > titleB) {
        return 1 * direction;
      }
      return 0;
    })
  }

  sortBooksByPrice(){
    this.isPriceSortedAscending = !this.isPriceSortedAscending;
    this.books.sort((a,b)=>{
      const priceA = parseFloat(a.price.replace('$', ''));
      const priceB = parseFloat(b.price.replace('$', ''));
      const direction = this.isPriceSortedAscending ? -1 : 1;
      if(priceA < priceB){
        return -1 * direction;
      }
      if(priceA > priceB){
        return 1 * direction;
      }
      return 0;
    })
  }

  searchBooks():void {
    if(this.searchQuery.trim() === ''){
      this.books = this.originBooks;
    } else {
      this.books = this.originBooks.filter((book)=>
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || book.subtitle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
