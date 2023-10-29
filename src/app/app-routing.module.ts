import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'main', component: MainPageComponent, canActivate: [authGuard]},
  { path: 'cart', component: CartPageComponent, canActivate: [authGuard]},
  { path: 'book/:id', component: BookPageComponent, canActivate: [authGuard]},
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', redirectTo: '/main'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
