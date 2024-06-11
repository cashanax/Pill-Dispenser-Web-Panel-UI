import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  dates :any;
  private apiUrl = 'http://localhost:8008/api'; // Base URL for the API

  constructor(private http: HttpClient) {
    this.getData();
  }

  getData() {
    this.http.get<{date: number}[]>(`${this.apiUrl}/schedule`).subscribe((slots) => {
      this.dates = slots.map(slot => {
        let date = new Date(slot.date * 1000); // Convert Unix timestamp to JavaScript Date object
        if (isNaN(date.getTime())) {
          console.error(`Invalid date format for slot: date = ${slot.date}`);
          return null;
        }
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return {
          date: date.toISOString().slice(0,10), // Extract the date in YYYY-MM-DD format
          time: date.toISOString().slice(11,16) // Extract the time in HH:MM format
        };
      }).filter(slot => slot !== null);
      console.log(this.dates);
    });
  }


  patchData(index: number, date: string, time: string) {
    const dateTime = new Date(`${date}T${time}`);
    const epochTime = Math.floor(dateTime.getTime() / 1000);
    const updatedSlot = {
      id: index,
      date: epochTime
    };
    console.log(epochTime);
    this.http.patch(`${this.apiUrl}/schedule/${index}`, updatedSlot).subscribe(response => {
      console.log(response);
    });
  }

}
