import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = [];
  private currentUserKey = 'current_user';

  constructor() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  private updateLocalStorage():void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  private updateCurrentUser(user: User): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  register(user: User):void {
    this.users.push(user);
    this.updateLocalStorage();
    this.updateCurrentUser(user);
  }

  getCurrentUser(): User | null {
    const storedUser = localStorage.getItem(this.currentUserKey);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  authenticate(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.updateCurrentUser(user);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  userExists(email: string): boolean {
    return this.users.some(user => user.email === email);
  }
}
