import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientPageComponent } from './client-page.component';
import { ClientPageRoutingModule } from './client-page-routing.module';
import { ProductsComponent } from './products/products.component';

import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [ClientPageComponent, ProductsComponent, CartComponent],
  imports: [CommonModule, ClientPageRoutingModule,FormsModule],
})
export class ClientPageModule {}
