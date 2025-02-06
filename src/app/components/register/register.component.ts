import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  role: string = 'client';  // Default role is client
  errorMessage: string = '';
  loading: boolean = false;

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  register(): void {
    this.loading = true;  // Show loading spinner
    this.authService.register(this.email, this.password, this.role).subscribe({
      next: (response) => {
        this.loading = false;  // Hide loading spinner
        // Redirect to login page after successful registration
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        this.loading = false;  // Hide loading spinner
        // Handle error and display message
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Registration error:', error);
      }
    });
  }

}
