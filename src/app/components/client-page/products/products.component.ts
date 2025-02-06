import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interface/Product'; // Adjust the path as needed

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productService: ProductService = inject(ProductService)
  products: Product[] = [];  // Array to hold products

  ngOnInit(): void {
    this.fetchProducts()
  }
  
  fetchProducts(){
    this.productService.getAllProducts().subscribe((data: Product[])=>{
      console.log(data);
      this.products = data;
    });
  }
}
