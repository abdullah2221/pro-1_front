import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientPageComponent } from './client-page.component';
import { ClientPageRoutingModule } from './client-page-routing.module';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [ClientPageComponent, ProductsComponent],
  imports: [CommonModule, ClientPageRoutingModule]
})
export class ClientPageModule {}
