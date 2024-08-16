import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DocumentServiceService } from 'src/app/services/document-service.service';

@Component({
  selector: 'app-show-pdf',
  templateUrl: './show-pdf.component.html',
  styleUrl: './show-pdf.component.scss'
})
export class ShowPdfComponent implements OnInit {

  pdfUrl: SafeResourceUrl;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer,
    private documentService: DocumentServiceService) { }

    ngOnInit(): void {
      
      this.route.paramMap.subscribe(params => {
        const id = +params.get('id');
        if (id) {
          this.loadPdf(id);
        } else {
          console.error('Aucun ID trouvé dans les paramètres de la route');
        }
      });
    }
  
    
    private loadPdf(id: number): void {
      this.documentService.downloadDocument(id).subscribe(response => {
        const fileURL = window.URL.createObjectURL(response);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
      }, error => {
        console.error('Erreur lors du téléchargement du document:', error);
      });
    }
}