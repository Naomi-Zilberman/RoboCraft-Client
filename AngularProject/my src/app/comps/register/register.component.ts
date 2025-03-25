import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../classes/User';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/UserService';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser: User = new User("888","", "", "");
  allU: Array<User> = new Array<User>();

  constructor(public us: UserService, public rr: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // קבלת הפרמטרים מה-query params
    this.route.queryParams.subscribe(params => {
      this.newUser.name = params['name'] || '';
      this.newUser.email = params['email'] || '';
    });
  }

  ok() {
    console.log(this.newUser);
  
    this.us.addUser(this.newUser).subscribe(response => {
      console.log('User added with ID:', response);
      
      // המרת האובייקט למחרוזת של פרמטרים
      const queryParams = {
        c: this.newUser.c,
        name: this.newUser.name,
        phone: this.newUser.phone,
        email: this.newUser.email,
        dateBirth: this.newUser.dateBirth,
        id: this.newUser.id

      };
  
      // מעבר לכתובת pay עם הפרמטרים
      this.rr.navigate(['pay'], { queryParams: queryParams });
  
    }, error => {
      console.error('Error adding user:', error);
    });
  }
  
}