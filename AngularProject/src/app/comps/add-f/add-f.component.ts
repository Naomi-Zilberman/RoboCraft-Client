import { Component, OnInit } from '@angular/core';
import { Robot } from '../../classes/Robot';
import { RobotService } from '../../services/RobotService';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Feature } from '../../classes/Feature';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-f',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterModule],
  templateUrl: './add-f.component.html',
  styleUrl: './add-f.component.css'
})
export class AddFComponent implements OnInit{
  
  newR: Robot = new Robot(0,"","",2,"","","","",[],[],);
  r?: Robot; // הגדרת המשתנה כ-undefined
  allF: Array<Feature> = new Array<Feature>();
  allc: Array<Feature> = new Array<Feature>();
  X:number=0;
  
  selectedFeatureInfo: string = ''; // משתנה חדש לפרטי הפיצ'ר

    constructor(private route: ActivatedRoute, private rs: RobotService, public rr: Router) { }
  
    ngOnInit(): void {

    }

  
    ok() {
      const id = Number(this.newR.id);
      this.rs.getR().subscribe(
        robots => {
          this.r = robots.find(p => p.id === id);
        },
        err => { console.log("error " + err.message) }
      );
      this.get2();
    }
  
    get2() {
      this.rs.getF(this.newR.id).subscribe(
        d => {
          this.allF = d; 
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  
    chose(f: Feature) {
      const index = this.allc.indexOf(f);
      if (index > -1) {
        this.allc.splice(index, 1); // מסיר את הפריט מהמערך
        if (this.r) {     
          // this.X=this.r.price;
          this.X = (this.X || 0) - (Number(f.price) || 0);
        }
      } else {
        this.allc.push(f);
        if (this.r) {
          // this.X=this.r.price;
          this.X = (this.X || 0) + (Number(f.price) || 0);
        }
      }
    }
    
  
    updateFeatureInfo(f: Feature) {
      this.selectedFeatureInfo = f.description; // עדכון פרטי הפיצ'ר שנבחר
    }
  
    shoppingCart(r: Robot) {
      // if(this.allc=[]){
      //   this.X=r.price
      // }
      if (this.r) {
        this.r.price=(this.X);
        this.r.connections = this.allc; // אם this.r קיים
        this.rs.shoppingCart.push(r);
        this.saveCartToLocalStorage(); // שמירה ל-Local Storage
          Swal.fire({
                icon : 'success', // סמל של הצלחה
                title: '...העידכונים מתבצעים',
                text: 'בדקות הקרובות הפעל מחדש את הרובוט והשתמש בהנאה',
                confirmButtonColor:'#ff6b6b',
                confirmButtonText: '👍', // טקסט על הכפתור
                timer: 3000,// זמן הצגה של ההודעה (3 שניות)
                showClass: {
                popup: 'animate__animated animate__fadeInDown' // אנימציה בכניסה
                },
                hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
                 // אנימציה ביציאה
                }
              });
        this.rr.navigate([`cart`]);
      } else {
        console.error("Robot object is not defined");
      }
    }
  
    private saveCartToLocalStorage() {
      localStorage.setItem('shoppingCart', JSON.stringify(this.rs.shoppingCart));
    }
  }
