import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { ProductsComponent } from './pages/products/products.component';
import { ReceivablesComponent } from './pages/receivables/receivables/receivables.component';
import { CashierComponent } from './pages/cashier/cashier/cashier.component';
import { OrdersComponent } from './pages/orders/orders/orders.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CartComponent } from './pages/Cart/cart/cart.component';
import { PaymentComponent } from './pages/Payment/payment/payment.component';
import { LoginComponent } from './auth/Login/login/login.component';
import { PaymentviewComponent } from './pages/Payment/paymentview/paymentview.component';
import { PaymenttransactionComponent } from './pages/Payment/paymenttransaction/paymenttransaction.component';
import { ViewreceivablesComponent } from './pages/receivables/viewreceivables/viewreceivables.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'',redirectTo:'/login', pathMatch:'full'},
    {
        path:'', component:LayoutComponent,
        children:[
            {path:'dashboard' , component:DashboardComponent, canActivate: [AuthGuard]},
            {path:'accounts' , component:AccountsComponent, canActivate: [AuthGuard]},
            {path:'inventory' , component:InventoryComponent, canActivate: [AuthGuard]},
            {path:'documents' , component:DocumentsComponent, canActivate: [AuthGuard]},
            {path:'reports' , component:ReportsComponent, canActivate: [AuthGuard]},
            {path:'supplier' , component:SupplierComponent, canActivate: [AuthGuard]},
            {path:'products' , component:ProductsComponent, canActivate: [AuthGuard]},
            {path:'receivables' , component:ReceivablesComponent, canActivate: [AuthGuard]},
            {path:'cashier' , component:CashierComponent, canActivate: [AuthGuard]},
            {path:'orders' , component:OrdersComponent, canActivate: [AuthGuard]},
            {path:'customers' , component:CustomersComponent, canActivate: [AuthGuard]},
            {path:'cart' , component:CartComponent, canActivate: [AuthGuard]},
            {path:'payments' , component:PaymentComponent, canActivate: [AuthGuard]},
            {path:'viewTerms/:order_id' , component:PaymentviewComponent, canActivate: [AuthGuard]},
            {path:'viewReceivables/:order_id' , component:ViewreceivablesComponent, canActivate: [AuthGuard]},
            {path:'paymenttransaction/:id' , component:PaymenttransactionComponent, canActivate: [AuthGuard]},
            {path:'document' , component:DocumentsComponent, canActivate: [AuthGuard]}
        ]
    },
    { path: 'login', component: LoginComponent},
];
