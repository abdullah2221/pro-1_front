import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminDashboardComponent } from './super-admin-dashboard.component';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { ProductManagementComponent } from './product-management/product-management.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowProductsComponent } from './show-products/show-products.component';
import { ShowCatigoriesComponent } from './show-catigories/show-catigories.component';

@NgModule({
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  declarations: [
    ProductManagementComponent,
    ShowProductsComponent,
    ShowCatigoriesComponent
  ],
  exports:[
    ShowProductsComponent
  ]
})
export class SuperAdminModule {}
