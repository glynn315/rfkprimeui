import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { DashboardModel } from '../../model/Dashboard/dashboard';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) { }

  displayDashboard(): Observable<DashboardModel>{
    return this.http.get<DashboardModel>(this.apiUrl);
  }
}
