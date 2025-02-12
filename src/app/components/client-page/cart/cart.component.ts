import { Component, inject, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import { CartItem, CartResponse } from 'src/app/interface/Cart';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private zone: NgZone = inject(NgZone);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private cartService: CartService = inject(CartService);

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.isLoading = true;
    this.cartService.getCart().pipe(
      tap((data: CartResponse) => {
        this.zone.run(() => {
          this.cartItems = data?.cart_items ?? [];  // ✅ Fix applied
          this.totalPrice = this.getTotalPrice();
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      }),
      catchError(error => {
        this.zone.run(() => {
          this.errorMessage = 'Failed to load cart. Please try again.';
          this.cartItems = [];  // ✅ Ensure cart is empty on failure
          this.isLoading = false;
          this.cdr.detectChanges();
        });
        return of([]);
      })
    ).subscribe();
  }
  

  addToCart(productId: number): void {
    this.cartService.addToCart(productId, 1).pipe(
      tap(() => this.loadCart()),
      catchError(error => {
        this.errorMessage = 'Failed to add item to cart.';
        return of(null);
      })
    ).subscribe();
  }

  removeFromCart(productId: number): void {
    this.cartService.removeCartItem(productId).pipe(
      tap(() => this.loadCart()),
      catchError(error => {
        this.errorMessage = 'Failed to remove item from cart.';
        return of(null);
      })
    ).subscribe();
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity < 1) return; // Prevents setting quantity to 0
    this.cartService.updateCartItem(productId, quantity).pipe(
      tap(() => this.loadCart()),
      catchError(error => {
        this.errorMessage = 'Failed to update item quantity.';
        return of(null);
      })
    ).subscribe();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.product_price * item.quantity), 0);
  }

 
  goBack(): void {
    window.history.back();
  }
  
}
