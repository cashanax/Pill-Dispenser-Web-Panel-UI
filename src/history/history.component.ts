import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  standalone: true,
  imports:[CommonModule, FormsModule],
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  dates: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8008/api/history').subscribe(data => {
      this.dates = data.map(item => {
        const date = new Date(item.date * 1000);
        console.log(date);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`; // Convert UNIX timestamp to Date and Time
      });
    });
  }
}
