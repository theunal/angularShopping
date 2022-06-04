import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: LayoutsComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'add', component: ProductAddComponent, canActivate: [AuthGuard] },
      { path: 'update/:codeGuid', component: ProductUpdateComponent, canActivate: [AuthGuard] },
      { path: 'orders', component: OrderComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
