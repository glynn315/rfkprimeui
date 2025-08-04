import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { Customer } from '../../model/Customer/customer.model';
import { Order } from '../../model/Order/order.model';
import { OrderInformation } from '../../model/Order/order-information.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private ApiUrl = `${environment.apiUrl}/orders`;
  
    constructor(private http: HttpClient) { }
  
    displayCustomer(): Observable<Order[]>{
      return this.http.get<Order[]>(this.ApiUrl);
    }

    displayInformation(order_id: string): Observable<OrderInformation>{
      return this.http.get<OrderInformation>(`${this.ApiUrl}/${order_id}`);
    }
  
    addnewOrders(post: Order): Observable<Order>{
      return this.http.post<Order>(this.ApiUrl,post);
    }
}
