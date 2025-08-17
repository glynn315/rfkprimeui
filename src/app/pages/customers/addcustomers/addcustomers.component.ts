import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from "../../../shared/modal/modal.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from '../../../Services/Customer/customer.service';
import { Customer } from '../../../model/Customer/customer.model';
import { Router } from '@angular/router';
import { CustomersComponent } from '../customers.component';

@Component({
  selector: 'app-addcustomers',
  imports: [ModalComponent, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './addcustomers.component.html',
  styleUrl: './addcustomers.component.scss',
  providers:[CustomerService]
})
export class AddcustomersComponent implements OnInit {

  constructor(private Customer: CustomersComponent,private CustomerServices: CustomerService, private router : Router){}
  CustomerFields: Customer = {
    customer_fname: '',
    customer_lname: '',
    customer_mname: '',
    contact_person: '',
    contact_number: '',
    customer_province: '',
    customer_city: '',
    customer_zip: 0,
    customer_status: 'ACTIVE'
  }

  @Input() openCustomerModal = false;
  headerText = 'Add New Customers';
  @Output() openCustomerModalChange = new EventEmitter<boolean>();

  ngOnInit(): void {
    
  }

  addNewCustomer(){
    this.CustomerServices.addNewCustomer(this.CustomerFields).subscribe(() => {
      this.openCustomerModalChange.emit(false);
      this.Customer.DisplayCustomer();
    });
  }
  

  closeModal() {
    this.openCustomerModalChange.emit(false);
  }
}
