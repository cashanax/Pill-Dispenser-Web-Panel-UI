import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "../login/login.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  config: any;
  private apiUrl = 'http://15.236.159.186/api'; // Base URL for the API
  currentD: any;
  constructor(private http: HttpClient) {
    this.getConfig();
  }
  getConfig() {
    this.http.get(`${this.apiUrl}/config`).subscribe(data => {
      this.config = data;
    });
  }

  protected readonly LoginComponent = LoginComponent;
}
