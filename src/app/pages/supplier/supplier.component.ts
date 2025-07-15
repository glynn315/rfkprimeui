import { Component } from '@angular/core';
import { AddSupplierComponent } from "./add-supplier/add-supplier.component";
import { LucideAngularModule ,PlusCircleIcon } from 'lucide-angular';

@Component({
  selector: 'app-supplier',
  imports: [AddSupplierComponent, LucideAngularModule],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss'
})
export class SupplierComponent {
  readonly plus = PlusCircleIcon;
  openSupplierModal = false;
  openModal(){
    this.openSupplierModal = true;
  }
  closeModal() {
    this.openSupplierModal = false;
  }
}
