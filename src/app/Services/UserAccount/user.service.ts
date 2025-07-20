import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { User } from '../../model/User/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private ApiUrl = `${environment.apiUrl}/userAccount`;

  constructor(private http: HttpClient) { }

  displayUser():Observable<User[]>{
    return this.http.get<User[]>(this.ApiUrl);
  }

  AddNewUser(post:User): Observable<User>{
    return this.http.post<User>(this.ApiUrl, post);
  }
}
