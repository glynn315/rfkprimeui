import { Component, OnInit } from '@angular/core';
import { TermsService } from '../../../Services/Terms/terms.service';
import { Terms } from '../../../model/Terms/terms.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotFoundError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
  providers: [TermsService]
})
export class PaymentComponent implements OnInit {

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
    this.router.navigate(['/viewTerms', order_id]);
  }



}
