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
  private apiUrl = 'http://localhost:8008'; // Base URL for the API

  constructor(private http: HttpClient) {
    this.getConfig();
  }
  getConfig() {
    this.http.get(`${this.apiUrl}/config`).subscribe(data => {
      this.config = data;
    });
  }
}
