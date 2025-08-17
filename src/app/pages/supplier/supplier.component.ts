import { Component, OnInit } from '@angular/core';
import { AddSupplierComponent } from "./add-supplier/add-supplier.component";
import { LucideAngularModule ,PlusCircleIcon } from 'lucide-angular';
import { SupplierService } from '../../Services/Supplier/supplier.service';
import { Supplier } from '../../model/Supplier/supplier.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier',
  imports: [AddSupplierComponent, LucideAngularModule, CommonModule],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss',
  providers:[SupplierService],
})
export class SupplierComponent implements OnInit {
  
  constructor(private SupplierService: SupplierService){}
  selectedSupplier: Supplier | null = null;
  readonly plus = PlusCircleIcon;
  openSupplierModal = false;
  displaySupplier: Supplier[] = [];


  ngOnInit(): void {
    this.DisplaySupplier();
  }

  DisplaySupplier(){
    this.SupplierService.displaySuppliers().subscribe((data)=>{
      this.displaySupplier = data;
    });
  }
  
  openModal(){
    this.selectedSupplier = null;
    this.openSupplierModal = true;
  }
  closeModal() {
    this.openSupplierModal = false;
  }
  editSupplier(supplier: Supplier) {
    this.selectedSupplier = supplier;
    this.openSupplierModal = true;
  }
  deleteSupplier(id: string) {
    if (confirm("Are you sure you want to delete this supplier?")) {
      this.SupplierService.removeSupplier(id).subscribe(() => {
        this.DisplaySupplier();
      });
    }
  }
}
