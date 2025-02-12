import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem, CartRequest, CartResponse } from '../interface/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http: HttpClient = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:8080/cart';


  // Add a product to the cart using query parameters
  addToCart(userId: number, productId: number, quantity: number = 1): Observable<CartRequest> {
    const params = new HttpParams()
      .set('user_id', userId.toString())
      .set('product_id', productId.toString())
      .set('quantity', quantity.toString());

    return this.http.post<CartRequest>(`${this.baseUrl}`, null, { params });
  }

  
  private getUserId(): number | null {
    const userId = localStorage.getItem('user_id');
    return userId ? parseInt(userId, 10) : null;
  }

  // // Add to cart (supports both body & query params)
  // addToCart(productId: number, quantity: number = 1, cartData: any = null): Observable<any> {
  //   const userId = this.getUserId();
  //   if (!userId) throw new Error('User ID not found');

  //   let params = new HttpParams()
  //     .set('user_id', userId.toString())
  //     .set('product_id', productId.toString())
  //     .set('quantity', quantity.toString());

  //   return this.http.post(this.apiUrl, cartData, { params });
  // }

  // Get cart items
  getCart(): Observable<any> {
    const userId = this.getUserId();
    if (!userId) throw new Error('User ID not found');

    let params = new HttpParams().set('user_id', userId.toString());
    return this.http.get(this.baseUrl, { params });
  }

  // Remove an item from the cart
  removeCartItem(productId: number): Observable<any> {
    const userId = this.getUserId();
    if (!userId) throw new Error('User ID not found');

    let params = new HttpParams()
      .set('user_id', userId.toString())
      .set('product_id', productId.toString());

    return this.http.delete(this.baseUrl, { params });
  }

  // Update cart item quantity
  updateCartItem(productId: number, quantity: number): Observable<any> {
    const userId = this.getUserId();
    if (!userId) throw new Error('User ID not found');

    let params = new HttpParams()
      .set('user_id', userId.toString())
      .set('product_id', productId.toString())
      .set('quantity', quantity.toString());

    return this.http.put(this.baseUrl, {}, { params });
  }
  
}
