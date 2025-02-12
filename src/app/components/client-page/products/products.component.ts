import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/interface/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);
  products: Product[] = [];  // Array to hold products

  // Object to store the quantity for each product.
  // The key is the product id and the value is the selected quantity.
  productQuantities: { [productId: number]: number } = {};

  ngOnInit(): void {
    this.fetchProducts();
  }
  
  fetchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        console.log('Products fetched:', data);
        this.products = data;
        // Initialize each product's quantity to 1
        data.forEach(product => {
          if (product.id !== undefined) {
            this.productQuantities[product.id] = 1;
          }
        });
      },
      error: (err) => console.error('Error fetching products', err)
    });
  }
  
  addToCart(product: Product): void {
    // Retrieve the user ID (ensure the user is logged in and the ID is stored)
    const userIdStr = localStorage.getItem('user_id');
    if (!userIdStr) {
      console.error("User ID not found. Please log in.");
      return;
    }
    const userId = parseInt(userIdStr, 10);
    const productId = product.id;
    if (productId === undefined) {
      console.error("Product ID is undefined.");
      return;
    }
    // Retrieve the quantity from our productQuantities object. Default to 1 if not set.
    const quantity = product.id !== undefined ? this.productQuantities[product.id] || 1 : 1;

    this.cartService.addToCart(userId, productId, quantity).subscribe({
      next: (response) => {

        console.log('Product successfully added to cart:', response);
        alert('Product added to cart successfully!');
        // Optionally, you could display a success message here or update the cart UI.
      },
      error: (error) => {
        console.error('Error adding product to cart:', error);
      }
    });
  }
}
