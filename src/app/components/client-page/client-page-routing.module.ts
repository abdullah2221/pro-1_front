import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientPageComponent } from './client-page.component';
import { authGuard } from 'src/app/guards/auth.guard';
import { ProductsComponent } from './products/products.component';
import { ClientPageModule } from './client-page.module';

const routes: Routes = [
  { path: '', component: ClientPageComponent, canActivate: [authGuard] },
  {path:'products',component:ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientPageRoutingModule {}
