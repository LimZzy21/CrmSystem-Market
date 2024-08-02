import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('user');

  if (token) {
    const user = JSON.parse(token);
    if (user.isEmployee) {
      return true;
    } else {
      router.navigate(['/shop']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};
