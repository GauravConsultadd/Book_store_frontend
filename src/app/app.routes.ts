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
// import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
    {path:'',component: BooklistComponent},
    {path: 'register',component: RegisterComponent},
    {path: 'login',component: LoginComponent},
    {path: 'book-details',component: BookDetailsComponent},
    {path: 'cart',component: CartComponent},
    {path: 'inventory',component: InventoryComponent},
    {path: 'dashboard',component: DashboardComponent},
    {path: 'orders',component: MyOrdersComponent},
    {path: 'dashboard/users',component: UsersComponent},
    {path: 'dashboard/books',component: BooksComponent},
    {path: 'dashboard/orders',component: OrdersComponent},
    {path: 'dashboard/genres',component: GenresComponent},
];
