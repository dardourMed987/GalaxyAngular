import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { notification } from 'src/app/model/notification';
import { Sujet } from 'src/app/model/sujet';
import { LivrableService } from 'src/app/services/livrable.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SujetService } from 'src/app/services/sujet.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications!:notification[];
  modalReference: any;
  message!:string;
  visible=false;
  

  constructor(
    private notificationService:NotificationService,
    private sujetService:SujetService,
    private modalService: NgbModal,
    private router:Router,
    private livrableService: LivrableService,)
  {

  }
  ngOnInit(): void {
    this.notifications=[];
    this.afficherNotification();
    this.message="";
  }

  validerSuppression(notification:notification)
  {
    let sujet =notification.sujet;
    sujet.statut=0;
    this.sujetService.updateSujetStatus(sujet).subscribe(
      response=>{
        console.log('modif sujet ok');
      }
    )

    notification.statut=1;
    this.notificationService.updateNotification(notification).subscribe(
      response=>{
        console.log('modif notification ok');
        this.afficherNotification();
        this.notificationService.actualiser();
      }
    )
  }

  validerSuppressionLivrable(notification:notification)
  {
    let livrable=notification.livrable;
    this.livrableService.deleteLivrable(livrable.id).subscribe(() => {

      this.afficherNotification();
        this.notificationService.actualiser();
      
    });

  }
  afficherNotification()
  {
    this.notificationService.getNotificationsNonTraitees().subscribe(
      response=>{
        this.notifications=response;
        this.notifications.sort((a,b)=>b.id-a.id)
      }
    )
  }

  RejeterSuppression(notification:notification)
  {

    let sujet =notification.sujet;
    sujet.statut=2;
    this.sujetService.updateSujetStatus(sujet).subscribe(
      response=>{
        console.log('modif sujet ok');
      }
    )

    notification.statut=1;
    this.notificationService.updateNotification(notification).subscribe(
      response=>{
        console.log('modif notification ok');
        this.afficherNotification();
        this.notificationService.actualiser();
      }
    )

  }

  RejeterSuppressionLivrable(notification:notification)
  {
    let livrabe= notification.livrable;
    livrabe.statut=0;
    this.livrableService.updateLivrablestatut(livrabe).subscribe(
      response=>{
        console.log('modif livrable ok');
      }
    )

    notification.statut=1;
    this.notificationService.updateNotification(notification).subscribe(
      response=>{
        console.log('modif notification ok');
        this.afficherNotification();
        this.notificationService.actualiser();
      }
    )
  }

  validerLajout(notification:notification)
  {
    let sujet =notification.sujet;
    sujet.statut=2;
    this.sujetService.updateSujetStatus(sujet).subscribe(
      response=>{
        console.log('modif sujet ok');
      }
    )

    notification.statut=1;
    this.notificationService.updateNotification(notification).subscribe(
      response=>{
        console.log('modif notification ok');
        this.afficherNotification();
        this.notificationService.actualiser();
      }
    )
  }

  AnnulerLajout(notification:notification)
  {
    let sujet =notification.sujet;
    sujet.statut=0;
    this.sujetService.updateSujetStatus(sujet).subscribe(
      response=>{
        console.log('modif sujet ok');
      }
    )

    notification.statut=1;
    this.notificationService.updateNotification(notification).subscribe(
      response=>{
        console.log('modif notification ok');
        this.afficherNotification();
        this.notificationService.actualiser();
      }
    )
  }
  openModal(content: any,messageNotif:string) {
    this.visible=true;
   this.message=messageNotif;
    this.modalReference = this.modalService.open(content, { centered: true });
  }

  consulterSujet(sujet:Sujet)
  {
    console.log(sujet.title);
    localStorage.removeItem('editSujetId');
    localStorage.setItem('editSujetId', sujet.id.toString());
    this.router.navigateByUrl('/admin/affichersujet/' + sujet.id);
  }

  

}
