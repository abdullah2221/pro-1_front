import { Component, inject } from '@angular/core';
import { Category } from 'src/app/interface/Category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-show-catigories',
  templateUrl: './show-catigories.component.html',
  styleUrls: ['./show-catigories.component.css']
})
export class ShowCatigoriesComponent {
  productService: ProductService = inject(ProductService);
  categories: Category[] = [];
  loading: boolean = true;  // Add a loading flag

  ngOnInit() {
    this.productService.GetAllCategories().subscribe({
      next: (response: Category[]) => {
        console.log("response ", response);
        this.categories = response;
        this.loading = false;  // Data is loaded, set loading to false
        console.log(this.categories);
      },
      error: (err) => {
        console.error('Failed to load categories', err);
        this.loading = false;  // In case of error, stop loading
      },
    });
  }
}
