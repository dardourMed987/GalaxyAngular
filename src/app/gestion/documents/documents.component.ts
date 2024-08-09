import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentServiceService } from 'src/app/services/document-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {

documents=[];
baseUrl!:string;

  constructor(private router: Router,
    private documentservice: DocumentServiceService
  ) {}
  ngOnInit(): void {
    this.handleSearchDocuments();
    this.baseUrl=environment.backendHost;
  }

  ajouterDocument()
  {
    this.router.navigateByUrl('/admin/addDocument');
  }

  handleSearchDocuments() {

    this.documentservice.getDocuments().subscribe(
      response=>{
        this.documents=response.reverse();
      },
      error=>{
        console.log(error)
      }
    )
  }

  getFileImage(documentUrl: string): string {
    const extension = documentUrl.split('.').pop();
    switch (extension) {
      case 'pdf':
        return 'https://img.icons8.com/color/48/000000/pdf.png';
      case 'doc':
      case 'docx':
        return 'https://img.icons8.com/color/48/000000/word.png';
      case 'ppt':
      case 'pptx':
        return 'https://img.icons8.com/color/48/000000/powerpoint.png';
      case 'mp4':
      case 'avi':
      case 'mov':
        return 'https://img.icons8.com/color/48/000000/video.png';
      default:
        return 'https://img.icons8.com/color/48/000000/file.png';
    }
  }

  modifierDocument(id: number) {
    this.router.navigate(['/admin/editdocument', id]);
  }

  supprimerDocument(id: number) {
    let conf = confirm('Êtes-vous sûr de vouloir supprimer le document?');
    if (!conf) return;

    this.documentservice.deleteDocument(id).subscribe(() => {
      alert("la supresion a ete bien effectué")
      this.handleSearchDocuments();
    },
  error=>{
    alert("erreur lors de la suppression du document");
  });
    
  }

  onDownloadDocument(id: number) {
    this.documentservice.downloadDocument(id);
  }



  
  
  
}
