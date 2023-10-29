import { Injectable } from '@angular/core';
import { CartItem, PersonalCart } from '../models/carts.model';
import { AuthService } from './auth.service';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'cart';
  private carts: PersonalCart[] = [];

  constructor(private authService: AuthService) {
    const storedCarts = localStorage.getItem(this.cartKey);
    if(storedCarts){
      this.carts = JSON.parse(storedCarts);
    }
  }

  private updateLocalStorage(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.carts));
  }

  addToCart(book: Book){
    const currentUser = this.authService.getCurrentUser();
    if(!currentUser){
      return
    }

    const existingCart = this.carts.find((cart)=> cart.email === currentUser.email);
    if(existingCart){
      const existingItem = existingCart.items.find((item)=> item.book.isbn13 === book.isbn13);
      if(existingItem){
        existingItem.quantity++;
      }else{
        existingCart.items.push({book, quantity: 1});
      }
    }else{
      this.carts.push({ email: currentUser.email, items: [{ book, quantity: 1 }] })
    }
    
    this.updateLocalStorage();
  }

  removeFromCart(book: Book): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      return;
    }

    const existingCart = this.carts.find((cart) => cart.email === currentUser.email);
    if (existingCart) {
      const existingItemIndex = existingCart.items.findIndex((item) => item.book.isbn13 === book.isbn13);
      if (existingItemIndex !== -1) {
        const existingItem = existingCart.items[existingItemIndex];
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          existingCart.items.splice(existingItemIndex, 1);
        }
        this.updateLocalStorage();
      }
    }
  }

  getCartItems(): CartItem[] {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      return [];
    }

    const existingCart = this.carts.find((cart) => cart.email === currentUser.email);
    return existingCart ? existingCart.items : [];
  }

  getQuantity(book: Book): number {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      return 0;
    }
  
    const existingCart = this.carts.find((cart) => cart.email === currentUser.email);
    if (!existingCart) {
      return 0;
    }
  
    const existingItem = existingCart.items.find((item) => item.book.isbn13 === book.isbn13);
    return existingItem ? existingItem.quantity : 0;
  }  
}
