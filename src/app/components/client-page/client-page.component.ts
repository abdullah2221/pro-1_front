import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css']
})
export class ClientPageComponent implements OnInit {
  router: Router = inject(Router)
  // Dependency injection for AuthService
  private authService: AuthService = inject(AuthService);

  // Properties for storing user information
  email: string | null = null;
  role: string | null = null;

  constructor() { }

  // Lifecycle hook to initialize the component
  ngOnInit(): void {
    this.loadUserInfo();
  }

  /**
   * Fetches user information from the AuthService and updates component properties.
   */
  private loadUserInfo(): void {
    const userInfo = this.authService.getUserInfo();

    if (userInfo) {
      this.email = userInfo.email;
      this.role = userInfo.role;
    } else {
      console.error('User information is not available.');
    }
  }

    /**
     * Navigates the user to the products page.
     * To be implemented with a router or other navigation logic.
     */
    navigateToProducts(): void {
    this.router.navigate(["client/products"]);  // Remove the leading slash
    console.log('Navigating to the products page...');
  }


  /**
   * Handles account management actions.
   * To be implemented with a router or modal.
   */
  manageAccount(): void {
    console.log('Navigating to account management...');
    // Add account management logic here
  }
}
