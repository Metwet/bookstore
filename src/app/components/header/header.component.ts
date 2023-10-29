import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private authService:AuthService, private router: Router){}

  isLoggedIn():boolean {
    return !!this.authService.getCurrentUser();
  }

  logout():void {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }

  getUserName(): string | null {
    const user = this.authService.getCurrentUser();
    return user ? user.username : '';
  }

  goToMain():void {
    this.router.navigate(['/main']);
  }

  goToCart():void {
    this.router.navigate(['/cart']);
  }
}
