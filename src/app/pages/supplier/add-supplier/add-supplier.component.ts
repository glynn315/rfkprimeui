import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from "../../../shared/modal/modal.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupplierService } from '../../../Services/Supplier/supplier.service';
import { Supplier } from '../../../model/Supplier/supplier.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-supplier',
  imports: [ModalComponent, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-supplier.component.html',
  styleUrl: './add-supplier.component.scss',
  providers: [SupplierService],
})
export class AddSupplierComponent implements OnInit {

  constructor(private SupplierService : SupplierService){}

  @Input() openSupplierModal = false;
  headerText = 'Add New Supplier';
  @Output() openSupplierModalChange = new EventEmitter<boolean>();
  SupplierFields: Supplier = {
    supplier_name: '',
    brand_name: '',
    supplier_status: 'ACTIVE'
  }
  ngOnInit(): void {
    
  }

  AddSupplier(){
    this.SupplierService.addSupplier(this.SupplierFields).subscribe(() => {

    });
  }



  

  closeModal() {
    this.openSupplierModalChange.emit(false);
  }
}
