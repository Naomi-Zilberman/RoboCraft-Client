import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RobotComponent } from './comps/robot-component/robot-component.component';
import { ArnavComponent } from './comps/arnav/arnav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RobotComponent, RouterLink, ArnavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';
}
