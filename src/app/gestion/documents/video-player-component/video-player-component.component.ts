import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentServiceService } from 'src/app/services/document-service.service';

@Component({
  selector: 'app-video-player-component',
  templateUrl: './video-player-component.component.html',
  styleUrl: './video-player-component.component.scss'
})
export class VideoPlayerComponentComponent implements OnInit{

  videoUrl: string | ArrayBuffer | null = '';

  constructor(private route: ActivatedRoute,
    private documentservice:DocumentServiceService
  )
  {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.loadVideo(id);
      } else {
        console.error('Aucun ID trouvé dans les paramètres de la route');
      }
    });
  }

  loadVideo(id:number)
  {
    this.documentservice.downloadDocument(id).subscribe(blob => {
      const videoUrl = URL.createObjectURL(blob);
      const videoElement = document.querySelector('video');
      
      if (videoElement) {
        videoElement.src = videoUrl; 
      }
    }, error => {
      console.log("Erreur:", error);
    });
  }
  

  

}
