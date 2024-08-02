import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TasklistComponent } from './components/tasklist/tasklist.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthComponent } from './pages/auth/auth.component';
import { authGuard } from './guards/auth.guard';
import { CustomersComponent } from './components/customers/customers.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { adminGuard } from './guards/admin.guard';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ContentProductsComponent } from './components/products/content-products/content-products.component';
import { CategoryComponent } from './components/products/category/category.component';
import { DetailsProductComponent } from './components/products/details-product/details-product.component';
import { CartComponent } from './components/products/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { EditOrderComponent } from './components/order-edit/order-edit.component';



export const routes: Routes = [
    { path: '', redirectTo: 'shop/products', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'shop/', redirectTo: 'shop/products/monitors' },
    {
        path: 'shop', component: ContentProductsComponent, children: [
            { path: 'products', redirectTo: 'products/monitors', pathMatch: 'full' },
            { path: 'products/:category', component: CategoryComponent },
            { path: 'addProduct', component: AddProductComponent },
            { path: 'products/:category/:id', component: DetailsProductComponent },
            { path: 'cart', component: CartComponent }
        ]
    },
    {
        path: 'auth', component: AuthComponent, children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'task', component: TasklistComponent },
            { path: 'customers', component: CustomersComponent },
            { path: 'profile', component: EditCustomerComponent },
            { path: 'user-edit/:id', component: EditCustomerComponent, canActivate: [adminGuard] },
            { path: 'calendar', component: CalendarComponent },
            { path: 'orders', component: OrdersComponent },
            { path: 'order-details/:id', component: OrderDetailsComponent },
            { path: 'order-edit/:id', component: EditOrderComponent }
        ], canActivate: [authGuard],
    }
];
