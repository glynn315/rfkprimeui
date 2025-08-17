import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class AddSupplierComponent implements OnInit, OnChanges {

  constructor(private supplierService: SupplierService){}

  @Input() openSupplierModal = false;
  @Input() editSupplier: Supplier | null = null; // 🔹 passed when editing
  @Output() openSupplierModalChange = new EventEmitter<boolean>();
  @Output() supplierSaved = new EventEmitter<void>(); // 🔹 notify parent

  headerText = 'Add New Supplier';

  SupplierFields: Supplier = {
    supplier_id: '',
    supplier_name: '',
    brand_name: '',
    supplier_status: 'ACTIVE'
  };

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editSupplier) {
      this.headerText = 'Edit Supplier';
      this.SupplierFields = { ...this.editSupplier }; // copy existing
    } else {
      this.headerText = 'Add New Supplier';
      this.resetForm();
    }
  }

  get isEditMode(): boolean {
    return this.editSupplier !== null;
  }

  saveSupplier(){
    if (this.isEditMode) {
      this.supplierService.updateSupplier(this.SupplierFields.supplier_id!, this.SupplierFields)
        .subscribe(() => {
          this.supplierSaved.emit();
          this.closeModal();
        });
    } else {
      this.supplierService.addSupplier(this.SupplierFields)
        .subscribe(() => {
          this.supplierSaved.emit();
          this.closeModal();
        });
    }
  }

  resetForm() {
    this.SupplierFields = {
      supplier_id: '',
      supplier_name: '',
      brand_name: '',
      supplier_status: 'ACTIVE'
    };
  }

  closeModal() {
    this.openSupplierModalChange.emit(false);
  }
}
