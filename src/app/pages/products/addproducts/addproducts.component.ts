import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from "../../../shared/modal/modal.component";
import { SupplierService } from '../../../Services/Supplier/supplier.service';
import { ProductService } from '../../../Services/Product/product.service';
import { Supplier } from '../../../model/Supplier/supplier.model';
import { Product } from '../../../model/Product/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-addproducts',
  imports: [ModalComponent, CommonModule , FormsModule, HttpClientModule],
  templateUrl: './addproducts.component.html',
  styleUrl: './addproducts.component.scss',
  providers: [SupplierService, ProductService]
})
export class AddproductsComponent implements OnInit {
  
  constructor(
    private SupplierServices : SupplierService, 
    private ProductServices: ProductService){}
  @Input() openTaskModal = false;
  headerText = 'Add New Products';
  @Output() openTaskModalChange = new EventEmitter<boolean>();
  SupplierData: Supplier[] = [];
  ProductFields : Product = {
    supplier_id: '',
    product_name: '',
    product_volume: '',
    product_quantity: '',
    product_pricepc: 0,
    product_pricebulk: 0,
    product_status: 'ACTIVE'
  }
  ngOnInit(): void {
    this.displayDropdown();
  }

  displayDropdown(){
    this.SupplierServices.displaySuppliers().subscribe((data) => {
      this.SupplierData = data;
    })

  }

  addProducts(){
    this.ProductServices.AddProduct(this.ProductFields).subscribe(()=>{

    });
  }


  
  closeModal() {
    this.openTaskModalChange.emit(false);
  }
}
