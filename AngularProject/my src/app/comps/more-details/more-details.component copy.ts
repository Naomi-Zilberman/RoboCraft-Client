import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RobotService } from '../../services/RobotService';
import { Robot } from '../../classes/Robot';
import { Feature } from '../../classes/Feature';

@Component({
  selector: 'app-product-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css']
})
export class MoreDetails implements OnInit {
  r?: Robot; // הגדרת המשתנה כ-undefined
  allF: Array<Feature> = new Array<Feature>();
  allc: Array<Feature> = new Array<Feature>();
  sum: number | undefined;

  constructor(private route: ActivatedRoute, private rs: RobotService, public rr: Router) { }

  ngOnInit(): void {
    this.get1();
    this.get2();
    this.sum = this.r?.price;
  }

  get1() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.rs.getR().subscribe(
      robots => {
        this.r = robots.find(p => p.id === id);
      },
      err => { console.log("error " + err.message) }
    );
  }

  get2() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.rs.getF(id).subscribe(
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
        this.r.price = (this.r.price || 0) - (Number(f.price) || 0);
      }
    } else {
      this.allc.push(f);
      if (this.r) {
        this.r.price = (this.r.price || 0) + (Number(f.price) || 0);
      }
    }
  }

  shoppingCart(r: Robot) {
    if (this.r) {
      this.r.connections = this.allc; // אם this.r קיים
      this.rs.shoppingCart.push(r);
      this.saveCartToLocalStorage(); // שמירה ל-Local Storage
      this.rr.navigate([`cart`]);
    } else {
      console.error("Robot object is not defined");
    }
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(this.rs.shoppingCart));
  }
}
