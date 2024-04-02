import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlertConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationInstance } from 'ngx-pagination';
import { Observable, catchError, interval, throwError } from 'rxjs';
import { avis } from 'src/app/model/avis';
import { client } from 'src/app/model/client';
import { Livrable } from 'src/app/model/livrable';
import { notification } from 'src/app/model/notification';
import { AuthService } from 'src/app/services/auth.service';
import { AvisService } from 'src/app/services/avis.service';
import { ClientService } from 'src/app/services/client.service';
import { EvaluationLivrableService } from 'src/app/services/evaluation-livrable.service';
import { LivrableService } from 'src/app/services/livrable.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-livrable',
  templateUrl: './livrable.component.html',
  styleUrls: ['./livrable.component.css'],
})
export class LivrableComponent implements OnInit {
  clients!:client[];
  client!:client;
  livrables!: any;
  livrables2!: any;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;
  notificationMessage: string = '';
  avis!:avis[];
  idLivrable!:number;
  Livrablesupp!:Livrable;
  avisAjout!:avis;
  affichageAvis=false;
  affichageAjout=false;
  showAlert = false;
  connectedUser!:string;
  visible=false;
  visibleSupp=false;
  visibleRapport=false;
  modalReference: any;
  showFieldsetClient=false;
  notification!: notification;
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
  visibleAjout=false;
  livrableModal:Livrable;

  constructor(
    private livrableService: LivrableService,
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private userService:UserService,
    private avisService:AvisService,
    config: NgbAlertConfig,
    private notificationService: NotificationService,
    private modalService: NgbModal,
    private evaluationLivrableservice:EvaluationLivrableService,
    private ClientService:ClientService
  ) {
    config.dismissible = true;
    config.type = 'success';
  }

  ngOnInit(): void {
    this.client= new client();
    this.connectedUser=this.authService.username;
    this.avis = new Array();
    this.idLivrable=0;
    this.avisAjout=new avis();
    this.notification = new notification();
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(''),
    });
    if (
      this.authService.roles == 'ADMIN USER' ||
      this.authService.roles == 'FORMATEUR' ||
      this.authService.roles == 'ADMIN FORMATEUR'
    ) {
      this.handleSearchLivrables();
    } else {
      this.getLivrablesByUsername();
    }
    this.searchClients();
  }

 // deleteLivrable(id: number) {
    /*let conf = confirm('Êtes-vous sûr de vouloir supprimer ce livrable ?');
    if (!conf) return;
    this.livrableService.deleteLivrable(id).subscribe(() => {
      this.handleSearchLivrables();
    });*/
  //}

  goToPageAddLivrable() {
    this.router.navigateByUrl('/admin/addlivrable');
  }

  handleSearchLivrables() {
    let kw = this.searchFormGroup?.value.keyword;
    this.livrables = this.livrableService.searchLivrable(kw).pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    ).subscribe(
      response=>{
        this.livrables=response
        for(let liv of this.livrables)
        {
          this.evaluationLivrableservice.getEvaluationByLivrable(liv.id).subscribe(
            response=>liv.evaluationLivrable=response
          )
        }
        console.log(this.livrables)
      }
    );
  }

  getLivrablesByUsername() {
    this.livrableService
      .getLivrablesByUsername(this.authService.username)
      .subscribe((data) => {
        this.livrables2 = data;
      });
  }

  afficherAvis(l:Livrable)
  {
    
      this.getAvisById(l.id);
      
   
  }

  AjouterAvis(id:number)
  {
  
 this.visibleAjout=true;
    this.idLivrable=id;
    this.userService.get(this.authService.username).subscribe(
      
      response=>
      {
        this.avisAjout.utilisateur=response
        console.log('user ok'+ this.avisAjout.utilisateur.firstName)
      }
    )
  
  }

  validerAjout()
  {
    //console.log(this.avisAjout.texteAvis)
    //console.log(this.avisAjout.utilisateur.userId)
    this.avisAjout.livrable=new Livrable();
   this.avisAjout.livrable.id=this.idLivrable;
   this.avisService.addAvis(this.avisAjout).subscribe(
    response=>{console.log("ajout ok")
    this.affichageAjout=false;
    this.idLivrable=0
    //this.avis.push(response)
    this.getAvisById(this.idLivrable);
    this.avisAjout=new avis();
    this.showAlert = true;
    interval(3000).subscribe(() => {
      this.showAlert = false;
    })

  }
   )
   this.visibleAjout=false;
  }

  getAvisById(id:number)
  {
    this.avisService.getAvisById(id).subscribe(
      response=>{
        this.avis=response;
      }
    )
  }

  deleteAvis(id:number)
  {
    this.avisService.deleteAvis(id).subscribe(
      response=>
      {
        this.getAvisById(this.idLivrable);
      }
    )
  }

  openModal(livrable:Livrable) {
    this.getAvisById(livrable.id);
    this.visible=true;
    
  }

  evaluerLivrable(livrable:Livrable)
  {
    this.router.navigateByUrl(`/admin/evaluerLivrable/${livrable.id}`);
  }

  rapportEvaluation(l:Livrable)
  {
    this.visibleRapport=true;
    this.livrableModal=l;
  }
  modifierEvaluation(evaluationLivrable)
  {
    this.router.navigateByUrl(`/admin/modifierEvaluation/${evaluationLivrable.id}`);
    
  }
  sendMail()
  {
   /* this.evaluationLivrableservice.sendMail().subscribe(
      response=>{
        console.log('mail ok');
      }
    );*/
    this.showFieldsetClient=true;
    
  }
  searchClients()
  {
    this.ClientService.getAllClient().subscribe(
      response=>{
        this.clients=response
      }
    )
  }
  onDialogHide()
  {
    this.showFieldsetClient=false;
  }
  envoyerRapport()
  {
    this.evaluationLivrableservice.sendMail(this.client.id,this.livrableModal.id).subscribe(
      response=>{
        console.log('mail ok');
        this.router.navigateByUrl('/admin/livrable');
      });
  }

  deleteLivrable( livrable:Livrable) {

   
    this.userService
      .get(this.authService.username)
      .subscribe((response) => (this.notification.utilisateur = response));
    this.Livrablesupp=livrable;

    this.visibleSupp = true;
  }

  saveNotification() {
    this.notification.message = this.notificationMessage;
    this.notification.livrable = this.Livrablesupp;
    this.notification.type = 'suppression ';
    this.visibleSupp = false;
    this.notificationService
      .addNotification(this.notification)
      .subscribe((response) => {
        console.log('demande envoyé');
        this.Livrablesupp.statut=1;
        this.livrableService.updateLivrablestatut(this.Livrablesupp).subscribe(
          response=>{
            this.handleSearchLivrables();
          }
        )
        
      });
  }
  afficherButton(livrabe: Livrable) {
    return livrabe.statut == 1;
  }

}
