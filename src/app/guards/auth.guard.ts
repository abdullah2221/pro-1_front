import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const token = localStorage.getItem('access_token');
  const role = localStorage.getItem('role');
  const targetUrl = state.url;

  if (token) {
    // If the token exists, check if the role allows access to the target URL
    if (role && isAllowedAccess(role, targetUrl)) {
      return true;
    } else {
      // If role is not valid for this URL, redirect to login
      router.navigate(['/login']);
      return false; 
    }
  } else {
    // If no token is found, redirect to login
    router.navigate(['/login']);
    return false;
  }
};

// Function to check if the user’s role is allowed to access the target URL
function isAllowedAccess(role: string, targetUrl: string): boolean {
  // Define role-based route access logic
   // Define role-based route access logic
   if (role === 'super_admin' && targetUrl === '/superadmin') {
    return true;
  } else if (role === 'simple_admin' && targetUrl === '/dashboard') {
    return true;
  } else if (role === 'client' && targetUrl === '/client') {
    return true;
  }
  return false;
}
