import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {GalleryComponent} from "../gallery/gallery.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BillyPanel';
}
