import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const user = localStorage.getItem('user');
  let userC;

  if (user) {
    userC = JSON.parse(user);
  }

  const id = route.params['id'];



  if (userC) {
    if (userC.isAdmin) {
      return true;
    } else if (id === userC.id) {
      return true;
    }
  }

  return false;
};
