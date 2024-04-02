import { Component, OnInit,ElementRef, ViewChild} from '@angular/core';
import { Sujet } from 'src/app/model/sujet';
import { Router } from '@angular/router';
import { SujetService } from 'src/app/services/sujet.service';
import { AuthService } from 'src/app/services/auth.service';
import * as html2pdf from 'html2pdf.js';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-afficher-sujet',
  templateUrl: './afficher-sujet.component.html',
  styleUrls: ['./afficher-sujet.component.css'],
})
export class AfficherSujetComponent implements OnInit {
  sujet: Sujet = new Sujet();
  alignement = 'left';
  constructor(
    private sujetService: SujetService,
    public authService: AuthService,
    private router: Router
  ) {
    
  }
  ngOnInit(): void {
    let sujetId = localStorage.getItem('editSujetId');
    if (!sujetId) {
      alert('Invalid Action!!!');
      this.router.navigate(['/admin/sujet']);
      return;
    }
    this.sujetService.getSujetById(+sujetId).subscribe((data) => {
      this.sujet = data;
    });
  }
  
  goToPageDisplayAllSujets() {
    this.router.navigateByUrl('/admin/sujet');
  }
  @ViewChild('htmlContainer22', { static: true }) htmlContainer!: ElementRef;
  generatePDF3() {
    const pdfContent = this.htmlContainer.nativeElement;
  
    if (pdfContent) {
      const options = {
        margin: 10,
        filename: 'sujet.pdf',
        html2canvas: { scale: 0.98 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
        pagebreak: { mode: 'avoid-all' },
      };
      const modifiedContent = pdfContent.cloneNode(true);
      this.resizeImages(modifiedContent);
      html2pdf().from(modifiedContent).set(options).toPdf().get('pdf').then((pdf:any) => {
        var totalPages = pdf.internal.getNumberOfPages();
    
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(10);
          pdf.setTextColor(150);
          
          pdf.text(10,                
            pdf.internal.pageSize.getHeight() - 10, 'INTI FORMATION - www.intiformation.fr');
    
          
        }
       
      }).save();
    }
  }

  
  private resizeImages(container: HTMLElement): void {
    const images = container.querySelectorAll('img');
  
    images.forEach((image: HTMLImageElement) => {
      // Ajuster la taille selon vos besoins
      const newWidth = image.width * 0.7;
      const newHeight = image.height * 0.7;
  
      image.width = newWidth;
      image.height = newHeight;
    });
  }
}