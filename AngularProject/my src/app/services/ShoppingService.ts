import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Robot } from '../classes/Robot';
import { Feature } from '../classes/Feature';
import { User } from '../classes/User';

@Injectable({
  providedIn: 'root'
})

export class ShoppingService {
 
  baseURL="https://localhost:7018/api/Order"

  constructor(public server:HttpClient) { }

  getU():Observable<Array<User>>
  {
    return this.server.get<Array<User>>(this.baseURL)
  }
  



}

