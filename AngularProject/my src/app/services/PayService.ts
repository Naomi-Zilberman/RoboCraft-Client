import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Robot } from '../classes/Robot';
import { Feature } from '../classes/Feature';
import { User } from '../classes/User';
import { Order } from '../classes/order';

@Injectable({
  providedIn: 'root'
})
export class PayService {
  public orders: Order[] = [];
  baseURL = "https://localhost:7018/api/Order";

  constructor(public server: HttpClient) { }

 

  addOrder(order: Order): Observable<number> {
    return this.server.post<number>(this.baseURL, order);
  }
}
