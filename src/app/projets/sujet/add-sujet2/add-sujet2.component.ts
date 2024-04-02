import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, take } from 'rxjs';
import { Level } from 'src/app/enum/level.enum';
import { Profile } from 'src/app/model/Profile';
import { notification } from 'src/app/model/notification';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SujetService } from 'src/app/services/sujet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-sujet2',
  templateUrl: './add-sujet2.component.html',
  styleUrls: ['./add-sujet2.component.css']
})
export class AddSujet2Component {
  levelType = Object.values(Level);
  sujetForm!: FormGroup;
  utilisateur!:User;
  showAlert = false;
  profiles!:Profile[];
  currentPage: number = 1;
  
  constructor(
    private sujetService: SujetService,
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private notificationService:NotificationService,
    private userService:UserService,
    private profileService:ProfileService
  ) {}
  
  ngOnInit(): void {
    
    this.userService.get(this.authService.username).subscribe(
      response=>this.utilisateur=response
    )
    this.sujetForm = this.fb.group({
      title: this.fb.control(null, [Validators.required]),
      operationDate: this.fb.control(null, [Validators.required]),
      timeConstraint: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null, [Validators.required]),
      functionality: this.fb.control(null, [Validators.required]),
      expectedDelivery: this.fb.control(null, [Validators.required]),
      level: this.fb.control(null, [Validators.required]),
      developerRating: this.fb.control(null, [Validators.required]),
      stackTechnique: this.fb.control(null, [Validators.required]),
      profile: this.fb.control(null, [Validators.required]), 
    });
    this.findAllProfiles();
  }
  saveSujet() {
  /* const htmlDescription=this.sujetForm.get('description')?.value;
   
    const afterDesc=this.addStylesToImages(htmlDescription);
    const descriptionControl = this.sujetForm.get('description');
if (descriptionControl) {
  descriptionControl.patchValue(htmlDescription);
}

   
   console.log(afterDesc);*/
    this.sujetService
      .addSujet(this.sujetForm.value)
      .subscribe(response => {
        let notif= new notification();
        notif.sujet=response;
        notif.type="ajout";
        notif.utilisateur=this.utilisateur;
       
        this.notificationService.addNotification(notif).subscribe(
          response=>{
            console.log("ajout notif ok");
          }
        )
        this.showAlert = true;
        interval(3000).pipe(take(1)).subscribe(() => {
          this.showAlert = false;
          console.log("test")
          this.router.navigateByUrl('admin/sujet')
        })
        
      }
        );
        //console.log(this.sujetForm.value);
        
        //  const htmlDescription=this.sujetForm.get('description');
         // console.log(this.extractImagesFromHtml(htmlDescription?.value));
        
          
        
  }
  cancelSaveSujet() {
    this.router.navigateByUrl('/admin/sujet');
  }
  findAllProfiles() {
    this.profileService.getProfiles().subscribe((data) => {
      this.profiles = data;
    });
  }

  //description: string = '';
  editorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '100px',
    placeholder: 'Entrez du texte ici...',
    translate: 'no',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
    ],
  };
  

  /*contentChanged(event: any): void {
    console.log('Contenu modifié : ', event);
  }*/

 /* extractImagesFromHtml(htmlContent: string): string[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const imgElements = doc.querySelectorAll('img');
    const imageUrls: string[] = [];

    imgElements.forEach((img) => {
      const imageUrl = img.getAttribute('src');
      if(imageUrl!=null)
      {
        if (this.isBase64DataUrl(imageUrl)) {
          imageUrls.push(imageUrl);
        }
      }
      
    });

    return imageUrls;
  }

  private isBase64DataUrl(url: string): boolean {
    // Simple check to determine if the URL is a base64 data URL
    return url.startsWith('data:image/');
  }*/
  nextPage() {
    if (this.currentPage < 4) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  
  
  private addStylesToImages(content: string): string {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = content;
  
    // Récupérez toutes les balises img dans le contenu
    const images = tempElement.getElementsByTagName('img');
  
    // Ajoutez des styles à chaque balise img
    for (let i = 0; i < images.length; i++) {
      const image = images[i] as HTMLImageElement;
      // Ajoutez vos styles ici
      image.style.maxWidth = '50px';
      // Ajoutez d'autres styles si nécessaire
    }
  
    // Utilisez la propriété outerHTML pour obtenir le contenu HTML de l'élément div
    return tempElement.outerHTML;
  }
  
  
}
