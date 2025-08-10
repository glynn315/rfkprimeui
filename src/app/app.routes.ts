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

export const routes: Routes = [
    {path:'',redirectTo:'/login', pathMatch:'full'},
    {
        path:'', component:LayoutComponent,
        children:[
            {path:'dashboard' , component:DashboardComponent},
            {path:'accounts' , component:AccountsComponent},
            {path:'inventory' , component:InventoryComponent},
            {path:'documents' , component:DocumentsComponent},
            {path:'reports' , component:ReportsComponent},
            {path:'supplier' , component:SupplierComponent},
            {path:'products' , component:ProductsComponent},
            {path:'receivables' , component:ReceivablesComponent},
            {path:'cashier' , component:CashierComponent},
            {path:'orders' , component:OrdersComponent},
            {path:'customers' , component:CustomersComponent},
            {path:'cart' , component:CartComponent},
            {path:'payments' , component:PaymentComponent},
            {path:'viewTerms/:order_id' , component:PaymentviewComponent},
            {path:'viewReceivables/:order_id' , component:ViewreceivablesComponent},
            {path:'paymenttransaction/:id' , component:PaymenttransactionComponent}
        ]
    },
    { path: 'login', component: LoginComponent},
];
