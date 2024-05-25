import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Image {
  name: string;
  modifiedDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private apiUrl = 'http://15.236.159.186:3000';

  constructor(private http: HttpClient) { }

  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}/gallery`);
  }

  getImage(imageName: string): string {
    return `${this.apiUrl}/gallery/${imageName}`;
  }
}
