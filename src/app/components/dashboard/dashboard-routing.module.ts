import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductManagementComponent } from '../super-admin-dashboard/product-management/product-management.component';
import { ShowProductsComponent } from '../super-admin-dashboard/show-products/show-products.component';
import { ShowCatigoriesComponent } from '../super-admin-dashboard/show-catigories/show-catigories.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {path:'product-management',component:ProductManagementComponent},
  {path:'show-products',component:ShowProductsComponent},
  {path:'show-categories',component:ShowCatigoriesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
