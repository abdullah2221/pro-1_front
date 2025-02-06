import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SuperAdminDashboardComponent } from './components/super-admin-dashboard/super-admin-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard',loadChildren:()=>import("./components/dashboard/dashboard.module").then(m=>m.DashboardModule), canActivate: [authGuard] },
  {path: 'superadmin',loadChildren:()=>import("./components/super-admin-dashboard/super-admin-routing.module").then(m=>m.SuperAdminRoutingModule), canActivate: [authGuard]},
  { path: 'client', loadChildren: () => import("./components/client-page/client-page.module").then(m => m.ClientPageModule), canActivate: [authGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
