import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-arnav',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './arnav.component.html',
  styleUrl: './arnav.component.css'
})
export class ArnavComponent {
  constructor(public l: Location) {}
  title = 'project';

  goBack() {
     this.l.back()
  }
  goAfter() {
     this.l.forward()
  }
}
