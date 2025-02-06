import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminDashboardComponent } from './super-admin-dashboard.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { SuperAdminModule } from './super-admin.module';
import { ShowProductsComponent } from './show-products/show-products.component';
import { ShowCatigoriesComponent } from './show-catigories/show-catigories.component';

const routes: Routes = [
  { path: '', component: SuperAdminDashboardComponent },
  { path: 'product-management', component: ProductManagementComponent },
  { path: 'show-products', component: ShowProductsComponent },
  { path: 'show-categories', component: ShowCatigoriesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SuperAdminDashboardComponent, SuperAdminModule], // Import standalone components here
  exports: [RouterModule],
})
export class SuperAdminRoutingModule { }