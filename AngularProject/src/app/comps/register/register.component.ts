import { Component, OnInit } from '@angular/core'; // ייבוא החבילות הדרושות
import { FormsModule } from '@angular/forms'; // ייבוא מודול טפסים
import { User } from '../../classes/User'; // ייבוא מחלקת משתמש
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // ייבוא רכיבי ניתוב
import { UserService } from '../../services/UserService'; // ייבוא שירות משתמש

@Component({
  selector: 'app-register', // בחירת הסלקטור
  standalone: true, // קביעת הקומפוננטה כעצמאית
  imports: [FormsModule, RouterModule], // ייבוא מודול טפסים ורכיבי ניתוב
  templateUrl: './register.component.html', // קובץ תבנית
  styleUrls: ['./register.component.css'] // קובץ סגנון
})
export class RegisterComponent implements OnInit {
  newUser: User = new User("888","", "", ""); // יצירת אובייקט משתמש חדש
  allU: Array<User> = new Array<User>(); // מערך של משתמשים

  constructor(public us: UserService, public rr: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // קבלת הפרמטרים מה-query params
    this.route.queryParams.subscribe(params => {
      this.newUser.name = params['name'] || ''; // עדכון שם המשתמש מהפרמטרים
      this.newUser.email = params['email'] || ''; // עדכון אימייל המשתמש מהפרמטרים
    });
  }

  ok() {
    console.log(this.newUser); // הדפסת המידע של המשתמש החדש
  
    this.us.addUser(this.newUser).subscribe(response => {
      console.log('User added with ID:', response); // הדפסת ה-ID של המשתמש שנוסף
      
      // המרת האובייקט למחרוזת של פרמטרים
      const queryParams = {
        c: this.newUser.c, // פרמטר c
        name: this.newUser.name, // פרמטר שם
        phone: this.newUser.phone, // פרמטר טלפון
        email: this.newUser.email, // פרמטר אימייל
        dateBirth: this.newUser.dateBirth, // פרמטר תאריך לידה
        id: this.newUser.id // פרמטר ID
      };
  
      // מעבר לכתובת pay עם הפרמטרים
      this.rr.navigate(['pay'], { queryParams: queryParams }); // ניווט לעמוד תשלום
  
    }, error => {
      console.error('Error adding user:', error); // טיפול בשגיאות
    });
  }
}
