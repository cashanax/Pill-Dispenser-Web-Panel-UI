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

  constructor(private http: HttpClient) {
    this.getData();
  }

  getData() {
    this.http.get<{id: string, date: string, time: string}[]>('http://localhost:3000/schedule').subscribe((slots) => {
      this.dates = slots.map(slot => {
        let date = new Date(slot.date);
        if (isNaN(date.getTime())) {
          console.error(`Invalid date format for slot with id ${slot.id}: date = ${slot.date}`);
          return null;
        }
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return { id: slot.id, date: date.toISOString().slice(0,10), time: slot.time };
      }).filter(slot => slot !== null);
      console.log(this.dates);
    });
  }


    patchData(index: number, date: string, time: string) {
      const id = this.dates[index].id;
      const updatedSlot = { date, time };
      this.http.patch(`http://localhost:3000/schedule/${id}`, updatedSlot).subscribe(response => {
        console.log(response);
      });
    }

}
