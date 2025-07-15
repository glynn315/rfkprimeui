import { Component } from '@angular/core';
import { LucideAngularModule , PlusCircleIcon } from "lucide-angular";
import { AddproductsComponent } from "./addproducts/addproducts.component";

@Component({
  selector: 'app-products',
  imports: [LucideAngularModule, AddproductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  readonly plus = PlusCircleIcon;
  openTaskModal = false;
  openModal(){
    this.openTaskModal = true;
  }
  closeModal() {
    this.openTaskModal = false;
  }
}
