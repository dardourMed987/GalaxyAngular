import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { notification } from 'src/app/model/notification';
import { Sujet } from 'src/app/model/sujet';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SujetService } from 'src/app/services/sujet.service';
import { UserService } from 'src/app/services/user.service';
import { PaginationInstance } from 'ngx-pagination';
import { DiscussionService } from 'src/app/services/discussion.service';
import { discussion } from 'src/app/model/discussion';
import { User } from 'src/app/model/user';
import { message } from 'src/app/model/message';
import { MessageService } from 'src/app/services/message.service';
import { Level } from 'src/app/enum/level.enum';
import { Profile } from 'src/app/model/Profile';
import { ProfileService } from 'src/app/services/profile.service';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';



@Component({
  selector: 'app-sujet',
  templateUrl: './sujet.component.html',
  styleUrls: ['./sujet.component.css'],
})
export class SujetComponent implements OnInit {
  sujets!: any[];
  modalReference: any;
  notificationMessage: string = '';
  sujet!: Sujet;
  notification!: notification;
  loading: boolean = false; 
  visible: boolean = false;
  visible2: boolean = false;
  discussion!:discussion;
  utilisateur!:User;
  messagediscussion!:string;
  message!:message;
  profils:Profile[];
  levelType = Object.values(Level);
  @ViewChild('filter') filter!: ElementRef;


  //une variable pour stocker la page actuelle
  p: number = 1;
  //nombre element par page
  itemsPerPage: number = 8;
  // instance de pagination
  config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: this.itemsPerPage,
    currentPage: this.p
  };
  constructor(
    private sujetService: SujetService,
    public authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private userService: UserService,
    private discussionService:DiscussionService,
    private messageService:MessageService,
    private profilService:ProfileService,
    private config2: PrimeNGConfig
  ) {}
  ngOnInit(): void {
    this.messagediscussion="";
    this.message= new message();
    this.getConnectedUser();
    if (
      this.authService.roles == 'ADMIN USER' ||
      this.authService.roles == 'FORMATEUR'
    ) {
      this.getSujets();
    } else {
      this.getSujetsByUsername();
    }
    this.notification = new notification();
    this.searchProfils();
    this.config2.setTranslation({
      startsWith: 'Commence par',
      contains: 'Contient', 
      endsWith: 'Se termine par', 
      equals: 'Égal à', 
      notEquals: 'Différent de', 
      lt: 'Inférieur à', 
      lte: 'Inférieur ou égal à', 
      gt: 'Supérieur à', 
      gte: 'Supérieur ou égal à',
      notContains: 'Ne contient pas',
      apply:'Appliquer',
      clear:'Effacer'
      
});
    
  }
  
  getSujets() {
    this.sujetService.getSujets().subscribe((data) => {
      this.sujets = data.reverse();
      this.sujets.forEach((s: Sujet) => {
        let disc:discussion;
        this.discussionService.getDiscussionById(s.id,this.utilisateur.username).subscribe(
          response=>{
            disc=response
            s.discussion = disc;
          }
        )
        
        
    });
    });
  }
  getSujetsByUsername() {
    this.sujetService
      .getSujetsByUsername(this.authService.username)
      .subscribe((data) => {
        this.sujets = data.reverse();
        
        for(let s of this.sujets )
        {
          this.sujetService.trouverDocumentProjetUtilisateurs(s.id, this.utilisateur.userId).subscribe(
            reponse=>{
             s.dateDebut= reponse[0].date_debut;
              s.dateFin=reponse[0].date_fin;

              const dateDebut = new Date(s.dateDebut);

              if (dateDebut > new Date()) {
                this.sujets = this.sujets.filter(subject => subject.id !== s.id);
              }
            }
          )
      
        }
        this.sujets.forEach((s: Sujet) => {
          let disc:discussion;
          this.discussionService.getDiscussionById(s.id,this.utilisateur.username).subscribe(
            response=>{
              disc=response
              s.discussion = disc;
            }
          )
          
          
      });

      });
  }
  /*deleteSujet(id: number) {
    let conf = confirm('Êtes-vous sûr de vouloir supprimer ce sujet ?');
    if (!conf) return;
    this.sujetService.deleteSujet(id).subscribe(() => {
      this.getSujets();
    });
  }*/
  gotToPageDisplaySujet(sujet: Sujet) {
    localStorage.removeItem('editSujetId');
    localStorage.setItem('editSujetId', sujet.id.toString());
    this.router.navigateByUrl('/admin/affichersujet/' + sujet.id);
  }
  goToPageAddSujet() {
    this.router.navigateByUrl('/admin/addsujet2');
  }
  goToPageAffectSujet(sujet: Sujet) {
    localStorage.removeItem('editSujetId');
    localStorage.setItem('editSujetId', sujet.id.toString());
    this.router.navigateByUrl('/admin/affectersujet');
  }

  showDialog( sujet: Sujet) {

    this.sujet = sujet;

    this.userService
      .get(this.authService.username)
      .subscribe((response) => (this.notification.utilisateur = response));
    this.visible = true;
  }

  saveNotification() {
    this.notification.message = this.notificationMessage;
    this.notification.sujet = this.sujet;
    this.notification.type = 'suppression';
    this.visible = false;
    this.notificationService
      .addNotification(this.notification)
      .subscribe((response) => {
        //this.modalReference.close('Save click');
        this.sujet.statut = 3;
        this.sujetService.updateSujetStatus(this.sujet).subscribe((response) => {
          this.getSujets();
        });
      });
  }
  afficherButton(sujet: Sujet) {
    return sujet.statut == 3;
  }
  getConnectedUser()
  {
    this.userService.get(this.authService.username).subscribe((data) => {
      this.utilisateur = data;
     // console.log(this.utilisateur.userId)
    });
  }
  
 /* getDiscussion(sujet: Sujet):discussion
  {
    //console.log(this.utilisateur.userId)
    //console.log(sujet.id)
    let disc:discussion;
    this.discussionService.getDiscussionById(sujet.id,this.utilisateur.username).subscribe(
      response=>{
        disc=response
      }
    )
    return disc;
    //return null;
  }*/

  afficherDiscussion(disc:discussion)
  {
    this.discussion=disc;
    this.discussion.messages.sort((a, b) => {
      return b.id - a.id;
  });
    this.visible2=true;
   
   
  }
  EnvoyerMessage()
  {
    this.message.message=this.messagediscussion;
    this.message.utilisateur=this.utilisateur;
    this.message.discussion=this.discussion;
    this.messageService.addMessage(this.message).subscribe(
      response=>{
        this.getSujetsByUsername();
       this.messagediscussion='';
       this.message=new message();
       this.visible2=false;
      }
    )
  }
  
  onCloseModal()
  {
    this.message=new message();
    this.visible2=false; 
  }

  searchProfils()
  {
    this.profilService.getProfiles().subscribe(
      response=>{
        this.profils=response
      }
    )
  }
  clear(table: Table) {
    table.clear();
    //this.filter.nativeElement.value = '';
}
}
