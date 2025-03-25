import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Robot } from '../classes/Robot';
import { Feature } from '../classes/Feature';
import { User } from '../classes/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public Users: User[] = [];
  baseURL = "https://localhost:7018/api/Customer";

  constructor(public server: HttpClient) { }

  getU(): Observable<Array<User>> {
    return this.server.get<Array<User>>(this.baseURL);
  }

  addUser(user: User): Observable<number> {
    return this.server.post<number>(this.baseURL, user);
  }
}
