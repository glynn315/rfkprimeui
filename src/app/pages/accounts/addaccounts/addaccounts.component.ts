import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from "../../../shared/modal/modal.component";

@Component({
  selector: 'app-addaccounts',
  imports: [ModalComponent],
  templateUrl: './addaccounts.component.html',
  styleUrl: './addaccounts.component.scss'
})
export class AddaccountsComponent {
  @Input() openAccountModal = false;
  headerText = 'Add New Users';
  @Output() openAccountModalChange = new EventEmitter<boolean>();

  closeModal() {
    this.openAccountModalChange.emit(false);
  }
}
