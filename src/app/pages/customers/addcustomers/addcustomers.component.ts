import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from "../../../shared/modal/modal.component";

@Component({
  selector: 'app-addcustomers',
  imports: [ModalComponent],
  templateUrl: './addcustomers.component.html',
  styleUrl: './addcustomers.component.scss'
})
export class AddcustomersComponent {
  @Input() openCustomerModal = false;
  headerText = 'Add New Customers';
  @Output() openCustomerModalChange = new EventEmitter<boolean>();

  closeModal() {
    this.openCustomerModalChange.emit(false);
  }
}
