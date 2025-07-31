import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { Customer } from '../../model/Customer/customer.model';
import { Order } from '../../model/Order/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private ApiUrl = `${environment.apiUrl}/orders`;
  
    constructor(private http: HttpClient) { }
  
    displayCustomer(): Observable<Order[]>{
      return this.http.get<Order[]>(this.ApiUrl);
    }
  
    addnewOrders(post: Order): Observable<Order>{
      return this.http.post<Order>(this.ApiUrl,post);
    }
}
