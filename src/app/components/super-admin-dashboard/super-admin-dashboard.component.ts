import { inject, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { User } from "src/app/interface/Users";
import { AuthService } from "src/app/services/auth.service";
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "src/app/services/product.service";
import { Category } from "src/app/interface/Category";

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./super-admin-dashboard.component.css']
})
export class SuperAdminDashboardComponent implements OnInit,OnChanges {
  users: User[] = [];
  newUser = { email: '', password: '', role: 'simple_admin' };
  newCategory: Category = { name: "" }; // 
  message = '';
  isSuccess = true;
  isModalOpen = false; // To control modal visibility
  isCategoryModalOpen = false; // Category modal visibility
  authService: AuthService = inject(AuthService);

  constructor(private router: Router) {}

  prouctService: ProductService = inject(ProductService);

  navigateTo(path: string): void {
    this.router.navigate(["/superadmin/product-management"]);
  }
  navigateToProduts(path: string): void {
    this.router.navigate(["/superadmin/show-products"]);
  }
  navigateToCategory(path: string): void {
    this.router.navigate(["/superadmin/show-categories"]);
  }

    // NEW: Define a mapping for role IDs
    roleMap: { [key: number]: string } = {
      1: 'Super Admin', // Role ID 1 -> Super Admin
      2: 'Admin',       // Role ID 2 -> Admin
      3: 'Client',      // Role ID 3 -> Client
    };



  ngOnInit(): void {
    this.fetchUsers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    
      this.fetchUsers()
  }


  fetchUsers(): void {
    this.authService.fetchAllUsers().subscribe({
      next: (res: any) => (this.users = res, console.log('Users:', res)),
      error: (err: any) => console.error('Error fetching users:', err),
    });
  }

  createUser(): void {
    const { email, password, role } = this.newUser;
    
    if (!email || !password || !role) {
      this.message = 'Please fill out all fields.';
      this.isSuccess = false;
      return;
    }

    const apiCall =
      role === 'simple_admin'
        ? this.authService.createSimpleAdmin(email, password)
        : this.authService.createClient(email, password);

    apiCall.subscribe({
      next: (res: any) => {
        this.message = res.message;
        this.isSuccess = true;
        this.closeModal(); // Close modal on success
        this.fetchUsers();
      },
      error: (err: any) => {
        this.message = err.error.detail || 'An error occurred.';
        this.isSuccess = false;
      },
    });
  }

  deleteUser(id:number):void{
    this.authService.Delete(id).subscribe({
      next: (res: any) => {
        this.message = res.message;
        this.isSuccess = true;
        this.fetchUsers();
      },
      error: (err: any) => {
        this.message = err.error.detail || 'An error occurred.';
        this.isSuccess = false;
      },
    });    
  }
  openModal(role: string): void {
    this.newUser = { email: '', password: '', role }; // Reset the form data
    this.isModalOpen = true;
  }

  closeModal(event?: Event): void {
    if (event) event.stopPropagation();
    
    this.isModalOpen = false;
  }

  
  // CATEGORY RELATED FUNCTIONS

  openCategoryModal(): void {
    this.newCategory = { name: ""}; // Reset form
    this.isCategoryModalOpen = true;
  }

  closeCategoryModal(event?: Event): void {
    if (event) event.stopPropagation();
    this.isCategoryModalOpen = false;
  }

  createCategory(): void {
    const { name } = this.newCategory;

    if (!name) {
      this.message = "Please enter a category name.";
      this.isSuccess = false;
      return;
    }

    this.prouctService.createCategory(this.newCategory).subscribe({
      next: (res: any) => {
        this.message = "Category created successfully!";
        this.isSuccess = true;
        this.closeCategoryModal();
      },
      error: (err: any) => {
        this.message = err.error.detail || "An error occurred.";
        this.isSuccess = false;
      },
    });
  }


  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
  getRoleName(roleId: number): string {
    return this.roleMap[roleId] || 'Unknown Role'; // Fallback for unknown IDs
  }
  Logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
