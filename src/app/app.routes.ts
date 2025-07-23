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

export const routes: Routes = [
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
        ]
    }
];
