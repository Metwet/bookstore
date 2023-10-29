import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user: User = {
    username: '',
    email: '',
    password: ''
  }

  registerForm!: FormGroup;
  showPasswordRequirements: boolean = false;
  showEmailRequirements: boolean = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
      repeatPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeatPassword')?.value;
    if (password === repeatPassword) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }
    this.user.username = this.registerForm.value.username;
    this.user.email = this.registerForm.value.email;
    this.user.password = this.registerForm.value.password;
    this.authService.register(this.user);
    this.router.navigate(['/main']);
  }
}
