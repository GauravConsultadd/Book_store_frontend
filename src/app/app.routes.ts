import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { BooklistComponent } from './pages/booklist/booklist.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { InventoryComponent } from './pages/inventory/inventory.component';

export const routes: Routes = [
    {path:'',component: BooklistComponent},
    {path: 'register',component: RegisterComponent},
    {path: 'login',component: LoginComponent},
    {path: 'book-details',component: BookDetailsComponent},
    {path: 'cart',component: CartComponent},
    {path: 'inventory',component: InventoryComponent},
];
