import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interface/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit, OnChanges {

  router: Router = inject(Router);
  productService: ProductService = inject(ProductService);
  userRole: string | null = null;
  createdBy: string | null = null; // Changed to string
  isSuperAdmin: boolean = false;
  products: Product[] = []; // Store fetched products
  loading: boolean = false; // Loader state

  ngOnInit(): void {
    this.getUserRole();
    this.loadProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getUserRole();
    this.loadProducts();
  }

  // Get user role and permissions
  getUserRole() {
    this.userRole = localStorage.getItem('role');
    this.createdBy = this.userRole === 'super_admin' ? 'super_admin' : 'simple_admin'; // Map to the correct role string
    this.isSuperAdmin = this.userRole === 'super_admin';
  }

  // Fetch all products
  loadProducts() {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (response: Product[]) => {
        console.log("response ", response);
        this.products = response;
      },
      error: (err) => {
        console.error('Failed to load products', err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  editProduct(product: Product) {
    console.log(product, "for edit the product");
  }

  deleteProduct(id: number | undefined) {
    if (!id) return; // Ensure id is valid

    this.productService.DeleteProduct(id).subscribe({
      next: () => {
        console.log("Specific Item Has been Deleted");
        // ✅ Correct: Remove the deleted product from the local list
        this.products = this.products.filter(product => product.id !== id);
      },
      error: (err) => {
        console.error("Failed to delete product", err);
      },
    });

    console.log(id, "for deleting the product");
  }

  goBack() {
    if (this.isSuperAdmin) {
      this.router.navigate(['/superadmin']); // Navigate to Super Admin dashboard
    } else {
      this.router.navigate(['/dashboard']); // Navigate to Simple Admin dashboard
    }
  }

}
