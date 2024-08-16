import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-powerpoint-viewer',
  templateUrl: './powerpoint-viewer.component.html',
  styleUrl: './powerpoint-viewer.component.scss'
})
export class PowerpointViewerComponent {

  @Input() fileUrl: string | undefined;
  sanitizedFileUrl: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.fileUrl) {
      this.sanitizedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://drive.google.com/viewer?url=${this.fileUrl}`);
    }
  }
}