import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private apiUrl = 'http://localhost:3000'; // Update this with your server URL

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  getImagesFromStorage(): Observable<string[]> {
    return this.http.get<{ images: string[]}>(`${this.apiUrl}/images`).pipe(
      map(response => response.images)
    );
  }
}
