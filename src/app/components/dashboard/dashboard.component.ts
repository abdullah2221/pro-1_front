import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/interface/Category';
import { Product } from 'src/app/interface/Product';
import { User } from 'src/app/interface/Users';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',

  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  authService:AuthService = inject(AuthService)
  router:Router = inject(Router)
  productService:ProductService = inject(ProductService)
  users:User[]=[]
  products:Product[]=[]
  category:Category[]=[]
  email:string | null  =''
  role:string | null = ''


  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
    this.email = userInfo.email
    this.role = userInfo.role
    this.FetchUsers()
    this.FetchProducts()
    this.FetchCategories()
      
  }


  FetchUsers() {
    const role: any = localStorage.getItem('role');
    if (role === "super_admin" || role === "simple_admin") {  // Fixed role check

      this.authService.fetchAllUsers().subscribe({
        next: (response: User[]) => {
    
          this.users = response.filter(user => user.role_id === 3);
          console.log(this.users, "Filtered Users (role_id = 3)");
        },
        error: (error) => {
          console.log(error);
        }
      });

    } else {
      console.log("You are not authorized to view this page");
    }
  }
  FetchProducts(){
    const role: any = localStorage.getItem('role');
    if (role === "super_admin" || role === "simple_admin") {  // Fixed role check
      this.productService.getAllProducts().subscribe({
        next: (response: Product[]) => {
          this.products = response;
          console.log(this.products, "All Products");
        },
        error: (error) => {
          console.log(error);
        }
      });

    } else {
      console.log("You are not authorized to view this page");
    }
  }

  FetchCategories(){
    const role: any = localStorage.getItem('role');
    if (role === "super_admin" || role === "simple_admin") {  // Fixed role check
      this.productService.GetAllCategories().subscribe({
        next: (response: Category[]) => {
          this.category = response;
          console.log(this.category, "All Categories");
        },
        error: (error) => {
          console.log(error);
        }
      });

    } else {
      console.log("You are not authorized to view this page");
  }


  }
  Logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  navigateTo(path: string): void {
    this.router.navigate(['/dashboard/add-product']);
  }
}
