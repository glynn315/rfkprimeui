import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from "../../../shared/modal/modal.component";

@Component({
  selector: 'app-add-supplier',
  imports: [ModalComponent],
  templateUrl: './add-supplier.component.html',
  styleUrl: './add-supplier.component.scss'
})
export class AddSupplierComponent {
  @Input() openSupplierModal = false;
  headerText = 'Add New Supplier';
  @Output() openSupplierModalChange = new EventEmitter<boolean>();

  closeModal() {
    this.openSupplierModalChange.emit(false);
  }
}
