import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/interface/auth-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;  // Track loading state

  // Injecting services for routing and auth
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  ngOnInit(): void {
    // You can handle any initial setup here if necessary
  }

  // Login method called when the user submits the login form
  login(): void {
    // Set loading state to true to show a spinner or loading indicator
    this.loading = true;

    // Clear previous error messages
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (response: AuthResponse) => {
        console.log('Login response:', response);
 // Set loading to false once response is received

        // Store the JWT token and role in localStorage for persistence
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('email', this.email);  // Storing email is optional
        localStorage.setItem('role', response.role);
        localStorage.setItem('created_by',response.created_by)

        // Role-based redirection after successful login
        if (response.role === 'super_admin') {
          this.router.navigate(['/superadmin']);  // Redirect to Super Admin Dashboard
        } else if (response.role === 'simple_admin') {
          this.router.navigate(['/dashboard']);  // Redirect to Simple Admin Dashboard
        } else if (response.role === 'client') {
          this.router.navigate(['/client']);  // Redirect to Client Page
        } else {
          // Handle unexpected roles gracefully
          this.errorMessage = 'Unexpected role. Please contact support.';
          console.error('Unexpected role:', response.role);
        }
      },
      error: (error: any) => {
        this.loading = false;  // Set loading to false if there's an error
        // If login fails, show an error message
        this.errorMessage = 'Invalid credentials. Please try again.';
        console.error('Login error:', error);
      }
    });
  }
}
