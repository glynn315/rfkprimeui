import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule , XSquareIcon } from 'lucide-angular';

@Component({
  selector: 'app-modal',
  imports: [LucideAngularModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  readonly Exit = XSquareIcon;
  @Input() isVisible: boolean = false;
  @Input() headerText: string = 'Header Sample';
  @Output() close = new EventEmitter<void>();

  closeModal(){
    this.close.emit();
  }



}
