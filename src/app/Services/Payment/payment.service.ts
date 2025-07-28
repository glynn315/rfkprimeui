import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../../model/Payment/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private ApiUrl = `${environment.apiUrl}/payment`;

  constructor(private http: HttpClient) { }

  displayPayments(): Observable<Payment[]>{
    return this.http.get<Payment[]>(this.ApiUrl);
  }

  addPayment(post: Payment): Observable<Payment>{
    return this.http.post<Payment>(this.ApiUrl, post);
  }
}
