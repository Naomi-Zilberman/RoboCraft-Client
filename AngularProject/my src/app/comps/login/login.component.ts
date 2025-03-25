import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../classes/User';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/UserService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser: User = new User("jhm","", "", "");
  allU: Array<User> = new Array<User>();
  u?: User
  constructor(public us: UserService, public rr: Router) { }

  ngOnInit(): void {
    this.us.getU().subscribe(
      d => {
        this.allU = d;
        if (this.allU.length > 0) {
          console.log(this.allU)
        }
      },

    );
  }

  toRegister() {
    this.rr.navigate(['login', 'register'], { queryParams: { name: this.newUser.name, email: this.newUser.email } });
}


login() {
  if (this.allU.length === 0) {
    return;
  }

  const user = this.allU.find(u => u.email.trim() === this.newUser.email.trim());
  
  if (user) {
    // אם המשתמש נמצא, העבר לדף pay עם הפרמטרים
    this.rr.navigate(['pay'], { queryParams: { 
      c: user.c, 
      name: user.name, 
      phone: user.phone, 
      email: user.email, 
      dateBirth: user.dateBirth, 
      id: user.id, 

    }});
  } else {
    this.toRegister();
  }
}


}
