import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { Terms } from '../../model/Terms/terms.model';

@Injectable({
  providedIn: 'root'
})
export class TermsService {

  private apiUrl = `${environment.apiUrl}/terms`;

  constructor(private http: HttpClient) { }

  displayTerms(): Observable<Terms[]>{
    return this.http.get<Terms[]>(this.apiUrl);
  }

  displayPendingTerms(): Observable<Terms[]>{
    return this.http.get<Terms[]>(`${this.apiUrl}/customerTerms`);
  }

  displayTermsInformation(id:string): Observable<Terms>{
    return this.http.get<Terms>(`${this.apiUrl}/payment/${id}`);
  }

  displayPaymentList(order_id: string): Observable<Terms[]>{
    return this.http.get<Terms[]>(`${this.apiUrl}/${order_id}`);
  }

  addTerms(post:Terms): Observable<Terms>{
    return this.http.post<Terms>(this.apiUrl, post);
  }
  updatePaymentStatus(id: String, status: string, paymentDate?: string): Observable<Terms> {
    const url = `${this.apiUrl}/${id}/status`;
    const body: any = {
      payment_status: status
    };
    if (paymentDate) {
      body.payment_date = paymentDate;
    }

    return this.http.put<Terms>(url, body);
  }
}
