import { Component, OnInit } from '@angular/core';
import { AddcustomersComponent } from "./addcustomers/addcustomers.component";
import { LucideAngularModule, PlusCircleIcon } from 'lucide-angular';
import { CustomerService } from '../../Services/Customer/customer.service';
import { Customer } from '../../model/Customer/customer.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  imports: [AddcustomersComponent, LucideAngularModule, HttpClientModule, CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  providers:[CustomerService],
})
export class CustomersComponent implements OnInit {

  constructor(private CustomerServices : CustomerService){}

  readonly plus = PlusCircleIcon;
  openCustomerModal = false;
  CustomerList: Customer[] = [];

  ngOnInit(): void {
    this.DisplayCustomer();
  }

  DisplayCustomer(){
    this.CustomerServices.displayCustomer().subscribe((data) => {
      this.CustomerList = data;
    });
  }

  // editCustomer(customer: Customer) {
  //   this.CustomerServices.updateCustomer(CustomerList.customer_id, customer).subscribe(() => {
  //     this.DisplayCustomer();
  //   });
  // }

  removeCustomer(id: string, status: string) {
    this.CustomerServices.updateStatus(id, status).subscribe(res => {
      this.DisplayCustomer();
    });
  }

  
  openModal(){
    this.openCustomerModal = true;
  }
  closeModal() {
    this.openCustomerModal = false;
  }
}
