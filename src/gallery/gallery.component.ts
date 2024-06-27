import { Component, OnInit } from '@angular/core';
import { GalleryService, Image } from './gallery.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  imageNames: Image[] = [];
  constructor(private galleryService: GalleryService)  { }

  ngOnInit() {
    this.galleryService.getImages().subscribe((images) => {
      this.imageNames = images;
    });
  }
  formattedDate(dateString: string): string {
    const parsedDate = new Date(dateString);
    return parsedDate.toISOString().replace("T", " ").replace("Z", "")
      .slice(0, -4);

  }
  getImageUrl(image: Image): string {
    return this.galleryService.getImage(image.name);
  }
}
