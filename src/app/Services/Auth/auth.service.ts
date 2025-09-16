import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/me`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    }).pipe(
      catchError(err => {
        if (err.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
        return throwError(() => err);
      })
    );
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }
}
