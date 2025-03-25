import { HttpClient, HttpParams } from '@angular/common/http'; // ייבוא רכיבי HTTP
import { Injectable } from '@angular/core'; // ייבוא דקורטור Injectable
import { Observable } from 'rxjs'; // ייבוא Observable
import { Robot } from '../classes/Robot'; // ייבוא מחלקת רובוט
import { Feature } from '../classes/Feature'; // ייבוא מחלקת פיצ'ר
import { User } from '../classes/User'; // ייבוא מחלקת משתמש

@Injectable({
  providedIn: 'root' // קביעת השירות כזמין בכל האפליקציה
})
export class ShoppingService {
 
  baseURL = "https://localhost:7018/api/Order"; // כתובת בסיסית ל-API של הזמנות

  constructor(public server: HttpClient) { } // קונסטרקטור המקבל HttpClient

  getU(): Observable<Array<User>> {
    return this.server.get<Array<User>>(this.baseURL); // קריאה ל-API לקבלת כל המשתמשים
  }
}
