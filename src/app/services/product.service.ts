import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interface/Product';
import { Category } from '../interface/Category';

// export interface Product {
//   id?: number;
//   name: string;
//   description: string;
//   price: number;
//   category_id: number;
// }
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products!:Observable<Product[]>;
  
  private apiUrl = 'http://127.0.0.1:8080'; // Update if needed

  constructor(private http: HttpClient) {}

  // // Add a new product
  // addProduct(productData: Product): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/products`, productData);
  // }

  // // Fetch all products
  // getAllProducts(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/products`);
  // }

  // // Update a product
  // updateProduct(productId: number, productData: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/update_product/${productId}`, productData);
  // }

  // // Delete a product
  // deleteProduct(productId: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/delete_product/${productId}`);
  // }


  // new apis's


  createProduct(product:Product):Observable<any>{
    return this.http.post(`${this.apiUrl}/products`,product);
  }

  getAllProducts():Observable<Product[]>{ 
    this.products = this.http.get<Product[]>(`${this.apiUrl}/products`);
    console.log(this.products)
    return this.products
  }

  DeleteProduct(id:number|any):Observable<any>{
    return this.http.delete(`${this.apiUrl}/products/${id}`);

  }





  createCategory(category:Category):Observable<any>{
    return this.http.post(`${this.apiUrl}/categories`,category);
  }


  


GetAllCategories():Observable<Category[]>{ 
  return this.http.get<Category[]>(`${this.apiUrl}/categories`);
}

}