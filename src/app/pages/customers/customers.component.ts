import { Component } from '@angular/core';
import { AddcustomersComponent } from "./addcustomers/addcustomers.component";
import { LucideAngularModule, PlusCircleIcon } from 'lucide-angular';

@Component({
  selector: 'app-customers',
  imports: [AddcustomersComponent, LucideAngularModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
  readonly plus = PlusCircleIcon;
  openCustomerModal = false;
  openModal(){
    this.openCustomerModal = true;
  }
  closeModal() {
    this.openCustomerModal = false;
  }
}
