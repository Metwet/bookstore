import { Component } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
  books: Book[] = [];

  constructor(private cartService: CartService){};

  ngOnInit(): void {
    this.books = this.cartService.getCartItems().map((item)=>item.book);
  }
  
  calculateTotalCost(): number {
    const cartItems = this.cartService.getCartItems();
    return cartItems.reduce((total, cartItem) => {
      const price = parseFloat(cartItem.book.price.replace('$', ''));
      total += price * cartItem.quantity;
      return total;
    }, 0);
  }
  
}
