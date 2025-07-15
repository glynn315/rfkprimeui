import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from "../../../shared/modal/modal.component";

@Component({
  selector: 'app-addproducts',
  imports: [ModalComponent],
  templateUrl: './addproducts.component.html',
  styleUrl: './addproducts.component.scss'
})
export class AddproductsComponent {
  @Input() openTaskModal = false;
  headerText = 'Add New Products';
  @Output() openTaskModalChange = new EventEmitter<boolean>();

  closeModal() {
    this.openTaskModalChange.emit(false);
  }
}
