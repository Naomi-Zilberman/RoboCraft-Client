import { HttpClient, HttpParams } from '@angular/common/http'; // ייבוא רכיבי HTTP
import { Injectable } from '@angular/core'; // ייבוא דקורטור Injectable
import { Observable } from 'rxjs'; // ייבוא Observable
import { Robot } from '../classes/Robot'; // ייבוא מחלקת רובוט
import { Feature } from '../classes/Feature'; // ייבוא מחלקת פיצ'ר
import { User } from '../classes/User'; // ייבוא מחלקת משתמש
import { Order } from '../classes/order'; // ייבוא מחלקת הזמנה
import { Product } from '../classes/Product'; // ייבוא מחלקת מוצר

@Injectable({
  providedIn: 'root' // קביעת השירות כזמין בכל האפליקציה
})
export class ProductService {
  public Products: Product[] = []; // מערך של מוצרים
  baseURL = "https://localhost:7018/api/OrDetails"; // כתובת בסיסית ל-API לפרטי הזמנה

  constructor(public server: HttpClient) { } // קונסטרקטור המקבל HttpClient

  addProduct(p: Product): Observable<number> {
    return this.server.post<number>(this.baseURL, p); // קריאה ל-API להוספת מוצר
  }
}
