import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interface/Product';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
})
export class ProductManagementComponent implements OnInit {
  productForm: FormGroup;
  userRole: string | null = null;
  createdBy: string | null = null;
  isSuperAdmin: boolean = false;
  isSimpleAdmin: boolean = false;
  products: Product[] = []; // Store fetched products
  loading: boolean = false; // Loader state

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category_id: ['', Validators.required],
      price: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')],
      ],
    });
  }

  ngOnInit(): void {
    this.getUserRole();
    // Fetch products when component initializes
  }

  // Get user role and permissions
  getUserRole() {
    this.userRole = localStorage.getItem('role');
    this.createdBy = this.userRole === 'super_admin' ? 'super_admin' : 'simple_admin';
    this.isSuperAdmin = this.userRole === 'super_admin';
    this.isSimpleAdmin = this.userRole === 'simple_admin';
  }

  // Fetch existing products with a loader
 

  // Function to add a product (Super Admin & Simple Admin)
  addProduct(): void {
    if (!(this.isSuperAdmin || this.isSimpleAdmin)) {
      alert('Access Denied: Only Super Admin and Simple Admin can add products.');
      return;
    }

    if (this.productForm.invalid) return;

    const newProduct: Product = {
      ...this.productForm.value,
      created_by: this.createdBy, // Assign the correct role
    };

    this.productService.createProduct(newProduct).subscribe({
      next: () => {
        alert('Product added successfully!');
        this.productForm.reset();
    
      },
      error: (err) => {
        alert('Failed to add product.');
        console.error(err);
      },
    });
  }
}
