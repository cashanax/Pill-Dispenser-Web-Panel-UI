import { Component, OnInit } from '@angular/core';
import {GalleryService} from "./gallery.service";

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  imageUrls: string[] = [];
  imagePreview: string = '';
  selectedFile: File | null = null;

  constructor(private imageStorageService: GalleryService) {}

  ngOnInit(): void {
    this.displayImagesFromStorage();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  uploadImage(): void {
    if (this.selectedFile) {
      this.imageStorageService.uploadImage(this.selectedFile).subscribe(response => {
        this.imagePreview = response.filePath;
        this.displayImagesFromStorage(); // Refresh the image list after upload
      });
    }
  }

  displayImagesFromStorage(): void {
    this.imageStorageService.getImagesFromStorage().subscribe(imagesUrls => {
      this.imageUrls = imagesUrls;
    });
  }
}
