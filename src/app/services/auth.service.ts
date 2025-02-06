import { inject, Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthResponse } from 'src/app/interface/auth-response';  // Your AuthResponse interface
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBaseUrl = 'http://127.0.0.1:8080';
  private apiUrl = 'http://127.0.0.1:8080/login';  // Backend API URL for login
  private apiUrl2 = 'http://127.0.0.1:8080/users';  // Backend API URL for user registration
  private router: Router = inject(Router);  // Injecting the router for navigation

  constructor(private http: HttpClient) {}

  // Login method: POST request to backend
  login(email: string, password: string): Observable<AuthResponse> {
    const body = { email, password };
    return this.http.post<AuthResponse>(this.apiUrl, body).pipe(
      map(response => {
        if (response.access_token) {
          // Store the token and role in localStorage
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('email', email);
          localStorage.setItem('role', response.role);
          localStorage.setItem('role_id', response.user_id);

          // Redirect based on the user's role
          if (response.role === 'super_admin') {
            this.router.navigate(['/superadmin']);  // Redirect to Super Admin Dashboard
          } else if (response.role === 'admin') {
            this.router.navigate(['/dashboard']);  // Redirect to Simple Admin Dashboard
          } else if (response.role === 'client') {
            this.router.navigate(['/client']);  // Redirect to Client Page
          }
        }
        return response;
      })
    );
  }


  Delete(id:number): Observable<any> {
   
    return this.http.delete(`${this.apiBaseUrl}/delete_user/${id}`,);
  }

  // Register method for user creation (for Super Admin and Simple Admin)
  register(email: string, password: string, role_name: string): Observable<any> {
    return this.http.post(`${this.apiUrl2}/register`, {
      email,
      password,
      role_name,
    });
  }

  // Method to get user info from localStorage
  getUserInfo() {
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    return { email, role };
  }
  fetchAllUsers(): Observable<any> {
  
    return this.http.get(`${this.apiBaseUrl}/users`);
  }
  createSimpleAdmin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/create_simple_admin`, {
      email,
      password,
    });
  }

  // Create a Client
  createClient(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/create_client`, {
      email,
      password,
    });
  }

  // Logout function to clear user data from localStorage
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('role_id');
    localStorage.removeItem('created_by')
    this.router.navigate(['/login']);  // Redirect to login after logout
  }

  // Example method for fetching data (adjust API URL if necessary)
  Data(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8080/data');  // Replace with your actual endpoint
  }
}
