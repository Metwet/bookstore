import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  loginForm!: FormGroup;
  showUserExistsMessage: boolean = false;
  wrongPasswordMessageVisible = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login():void {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
  
    const isAuthenticated = this.authService.authenticate(email, password);
    if (isAuthenticated) {
      this.router.navigate(['/main']);
    } else {
      this.wrongPasswordMessageVisible = true;
    }
  }

  checkUserExists(): void {
    const email = this.loginForm.get('email')?.value;
    const userExists = this.authService.userExists(email);
    this.showUserExistsMessage = userExists;
  }
}
