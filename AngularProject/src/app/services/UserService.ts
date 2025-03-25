import { HttpClient, HttpParams } from '@angular/common/http'; // ייבוא רכיבי HTTP
import { Injectable } from '@angular/core'; // ייבוא דקורטור Injectable
import { Observable } from 'rxjs'; // ייבוא Observable
import { Robot } from '../classes/Robot'; // ייבוא מחלקת רובוט
import { Feature } from '../classes/Feature'; // ייבוא מחלקת פיצ'ר
import { User } from '../classes/User'; // ייבוא מחלקת משתמש

@Injectable({
  providedIn: 'root' // קביעת השירות כזמין בכל האפליקציה
})
export class UserService {
  public Users: User[] = []; // מערך של משתמשים
  baseURL = "https://localhost:7018/api/Customer"; // כתובת בסיסית ל-API של לקוחות

  constructor(public server: HttpClient) { } // קונסטרקטור המקבל HttpClient

  getU(): Observable<Array<User>> {
    return this.server.get<Array<User>>(this.baseURL); // קריאה ל-API לקבלת כל המשתמשים
  }

  addUser(user: User): Observable<number> {
    return this.server.post<number>(this.baseURL, user); // קריאה ל-API להוספת משתמש חדש
  }
}
