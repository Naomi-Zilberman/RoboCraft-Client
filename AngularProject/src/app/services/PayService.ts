import { HttpClient, HttpParams } from '@angular/common/http'; // ייבוא רכיבי HTTP
import { Injectable } from '@angular/core'; // ייבוא דקורטור Injectable
import { Observable } from 'rxjs'; // ייבוא Observable
import { Robot } from '../classes/Robot'; // ייבוא מחלקת רובוט
import { Feature } from '../classes/Feature'; // ייבוא מחלקת פיצ'ר
import { User } from '../classes/User'; // ייבוא מחלקת משתמש
import { Order } from '../classes/order'; // ייבוא מחלקת הזמנה

@Injectable({
  providedIn: 'root' // קביעת השירות כזמין בכל האפליקציה
})
export class PayService {
  public orders: Order[] = []; // מערך של הזמנות
  baseURL = "https://localhost:7018/api/Order"; // כתובת בסיסית ל-API להזמנות

  constructor(public server: HttpClient) { } // קונסטרקטור המקבל HttpClient

  addOrder(order: Order): Observable<number> {
    return this.server.post<number>(this.baseURL, order); // קריאה ל-API להוספת הזמנה
  }
}
