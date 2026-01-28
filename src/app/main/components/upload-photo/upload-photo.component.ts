import {Component, Input, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  imports: [
    MatIconModule,
    CommonModule,
    MatButtonModule
  ],
  styleUrls: ['./upload-photo.component.scss'],
  standalone: true,
})
export class UploadPhotoComponent implements OnInit {

  @Input() ownerUuid!: string;
  @Input() filePreview!: any;

  selectedFile!: File | null;

  constructor() {
  }

  ngOnInit() {
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      this.setFilePreview();
    } else {
      this.selectedFile = null;
    }
  }

  private setFilePreview() {
    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = {
        preview: reader.result,
        name: this.selectedFile?.name,
        title: this.selectedFile?.name,
        ownerUuid: this.ownerUuid,
        sizeInBytes: this.selectedFile?.size,
        contentType: this.selectedFile?.type
      };
    };
    if(this.selectedFile){
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
