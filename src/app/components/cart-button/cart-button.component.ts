import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss']
})
export class CartButtonComponent {
  @Input() book!: Book;

  constructor(private cartService: CartService, private router: Router){}

  quantity: number = 0;

  ngOnInit(): void {
    this.quantity = this.cartService.getQuantity(this.book);
  }

  addBookInCart():void{
    this.cartService.addToCart(this.book);
    this.quantity = this.cartService.getQuantity(this.book);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.book);
    this.quantity = this.cartService.getQuantity(this.book);
  }

  goToCart(){
    this.router.navigate(['/cart']);
  }
}
