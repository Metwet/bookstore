import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authenticated = localStorage.getItem('current_user');
  const router = inject(Router);
  if(authenticated){
    return true;
  } else {
    router.navigate(['/signin']);
    return false;
  }
};
