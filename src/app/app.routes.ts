import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { BooklistComponent } from './pages/booklist/booklist.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { BooksComponent } from './pages/books/books.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { GenresComponent } from './pages/genres/genres.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { hasRoleGuard } from './has-role.guard';
import { Role } from './role';
// import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
    {path: 'register',component: RegisterComponent},
    {path: 'login',component: LoginComponent},
    {path:'',component: BooklistComponent,canActivate: [hasRoleGuard],
    data: {
      roles: [ Role.Admin,Role.Buyer,Role.Seller ]
    }},
    {path: 'book-details',component: BookDetailsComponent,canActivate: [hasRoleGuard],
    data: {
      roles: [ Role.Admin,Role.Buyer,Role.Seller ]
    }},
    {path: 'cart',component: CartComponent, canActivate: [hasRoleGuard],
    data: {
      roles: [ Role.Admin,Role.Buyer,Role.Seller ]
    }},
    {path: 'inventory',component: InventoryComponent,canActivate: [hasRoleGuard],
    data: {
      roles: [ Role.Admin, Role.Seller ]
    }},
    {path: 'dashboard',component: DashboardComponent,canActivate: [hasRoleGuard],
    data: {
      roles: [ Role.Admin ]
    }},
    {path: 'orders',component: MyOrdersComponent,canActivate: [hasRoleGuard],
    data: {
      roles: [ Role.Admin,Role.Buyer,Role.Seller ]
    }},
    {path: 'dashboard/users',component: UsersComponent,canActivate: [hasRoleGuard],
    data: {
      roles: [ Role.Admin ]
    }},
    {path: 'dashboard/books',component: BooksComponent,canActivate: [hasRoleGuard],
    data: {
      roles: [ Role.Admin ]
    }},
    {path: 'dashboard/orders',component: OrdersComponent,canActivate: [hasRoleGuard],
    data: {
      roles: [ Role.Admin ]
    }},
    {path: 'dashboard/genres',component: GenresComponent,canActivate: [hasRoleGuard],
    data: {
      roles: [ Role.Admin ]
    }},
    {path: 'unauthorized',component: UnauthorizedComponent},
];
