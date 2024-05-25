import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  config: any;
  constructor(private http: HttpClient) {
    this.getConfig();
  }
  getConfig() {
    this.http.get('http://15.236.159.186:3000/config').subscribe(data => {
      this.config = data;
    });
  }
}
