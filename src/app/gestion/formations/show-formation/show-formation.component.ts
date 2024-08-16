import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Formation } from 'src/app/model/formation';
import { FormationService } from 'src/app/services/formation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-formation',
  templateUrl: './show-formation.component.html',
  styleUrl: './show-formation.component.scss'
})
export class ShowFormationComponent {

  formation: Formation | undefined;
  baseUrl!:string;

  constructor(
    private route: ActivatedRoute,
    private formationService: FormationService
  ) {}

  ngOnInit(): void {
    this.baseUrl=environment.backendHost+"/images/";
    const formationId = this.route.snapshot.paramMap.get('id');
    if (formationId) {
      this.loadFormation(parseInt(formationId, 10));
    }
  }

  loadFormation(id: number): void {
    this.formationService.getFormationById(id).subscribe((data: Formation) => {
      this.formation = data;
    });
  }

  onDownloadDocument(documentUrl: string): void {
    window.open(documentUrl, '_blank');
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

}
