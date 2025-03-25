import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RobotService } from '../../services/RobotService';
import { Robot } from '../../classes/Robot';
import { CommonModule } from '@angular/common';
import { Feature } from '../../classes/Feature';
import { FormsModule } from '@angular/forms';
import { FeatureService } from '../../services/FeatureService';
import { ChangeColorDirective } from '../../highlight.directive';

@Component({
  selector: 'app-robot-component',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule,ChangeColorDirective],
  templateUrl: './robot-component.component.html',
  styleUrls: ['./robot-component.component.css']
})
export class RobotComponent implements OnInit {
  allF: Array<Feature> = new Array<Feature>();
  allR: Array<Robot> = new Array<Robot>();
  allC: Array<number> = new Array<number>();
  material: string = '';
  price: number | null = null;
  feature: number | null = null;
  uniqueMaterials: Array<String>=new Array<String>
  constructor(public rs: RobotService,public fs: FeatureService, public rr: Router) { }

  ngOnInit(): void {
    this.get1();
  this.getf()

  }

  get1() {
    this.rs.getR().subscribe(
      d => {
        this.allR = d;
        // יצירת מערך ייחודי של חומרים לאחר שהנתונים נטענו
        this.uniqueMaterials = Array.from(new Set(this.allR.map(r => r.material)));
      },
      (error) => {
        console.error('Error fetching robots', error);
      }
    );
  }
  
  getf() {
    this.fs.getF().subscribe(
      t => {
        this.allF = t;
      },
    );
  }
  chose(id: number) {
    const index = this.allC.indexOf(id);
    if (index > -1) {
      this.allC.splice(index, 1); // מסיר את ה-id מהמערך
    } else {
      this.allC.push(id);
    }
  }
  filterByMaterial(material?: string, priceInput?: string) {
    const price = priceInput ? parseFloat(priceInput) : undefined; // המרת string ל-number
    
    // לא צריך המרה ל-array כי allC כבר מערך
    const features = this.allC.length > 0 ? this.allC : undefined;
  
    this.rs.filterRobots(material, price, features).subscribe(
      (data: Robot[]) => {
        this.allR = data;
      },
      (error) => {
        console.error('Error fetching filtered robots', error);
      }
    );
  }
  
  cancle(){
    this.material = '';
    this.price = null;
    this.feature = null;
    this.allC.splice(0,this.allC.length)
   this.rs.filterRobots().subscribe(
    (data: Robot[]) => {
      this.allR = data;
    },
    (error) => {
      console.error('Error fetching filtered robots', error);
    });
  }

  // לא צריך המרה ל-array כי allC כבר מערך

  


  sort() {
    this.allR.sort((a: Robot, b: Robot) => a.price - b.price);
  }
  
  more(r: Robot) {
    this.rr.navigate([`more/${r.id}`]);
  }
}
