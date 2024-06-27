import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent  {

  private apiUrl = 'http://15.236.159.186/api'; // Base URL for the API

  dates: { date: string, time: string }[] = Array(21).fill({ date: '', time: '' });
  repeatDate: string;
  repeatPeriod: number;
  repeatTime: string;
  showWarning: boolean = false;
  hours: number[] = Array.from({ length: 24 }, (_, i) => i + 1);

  constructor(private http: HttpClient) {
    this.getData();
    this.repeatDate = ''; // Initialize repeatDate
    this.repeatPeriod = 1; // Initialize repeatPeriod with default value 1
    this.repeatTime = ''; // Initialize repeatTime
  }
  repeatDateEveryPeriod() {
    if (!this.repeatDate) {
      this.showWarning = true;
      return;
    }
    this.showWarning = false;
    const startDateTime = new Date(`${this.repeatDate}T${this.repeatTime}`);
    for (let i = 0; i < 21; i++) {
      const currentDateTime = new Date(startDateTime);
      currentDateTime.setHours(startDateTime.getHours() + 1 + i * this.repeatPeriod);
      this.dates[i] = {
        date: currentDateTime.toISOString().split('T')[0],
        time: currentDateTime.toISOString().split('T')[1].slice(0, 5)
      };
      // Call patchData to update the backend
      this.patchData(i, this.dates[i].date, this.dates[i].time);
    }
  }
  getData() {
    this.http.get<{ date: number }[]>(`${this.apiUrl}/schedule`).subscribe((slots) => {
      this.dates = slots.map(slot => {
        let date = new Date(slot.date * 1000); // Convert Unix timestamp to JavaScript Date object
        if (isNaN(date.getTime())) {
          console.error(`Invalid date format for slot: date = ${slot.date}`);
          return null;
        }
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return {
          date: date.toISOString().slice(0, 10), // Extract the date in YYYY-MM-DD format
          time: date.toISOString().slice(11, 16) // Extract the time in HH:MM format
        };
      }).filter((slot): slot is { date: string, time: string } => slot !== null);
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
