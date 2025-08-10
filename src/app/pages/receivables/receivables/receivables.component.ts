import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Terms } from '../../../model/Terms/terms.model';
import { TermsService } from '../../../Services/Terms/terms.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-receivables',
  imports: [CommonModule,HttpClientModule],
  templateUrl: './receivables.component.html',
  styleUrl: './receivables.component.scss',
  providers:[TermsService]
})
export class ReceivablesComponent implements OnInit {

  
  constructor(private TermsServices: TermsService, private router :Router){}

  TermsList: Terms[] = [];

  ngOnInit(): void {
    this.displayTermsList();
  }

  displayTermsList(){
    this.TermsServices.displayPendingTerms().subscribe((data) => {
      this.TermsList = data;
    });
  }

  viewTerms(order_id?:string):void{
    if (!order_id) {
      
    }
    this.router.navigate(['/viewReceivables', order_id]);
  }



}
