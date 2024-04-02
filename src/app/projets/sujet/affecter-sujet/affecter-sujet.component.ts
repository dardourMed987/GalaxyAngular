import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Sujet } from 'src/app/model/sujet';
import { User } from 'src/app/model/user';
import { SujetService } from 'src/app/services/sujet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-affecter-sujet',
  templateUrl: './affecter-sujet.component.html',
  styleUrls: ['./affecter-sujet.component.css'],
})
export class AffecterSujetComponent implements OnInit {
  users!: Observable<Array<User>>;
  utilisateurs!:User[];
  sujetId = localStorage.getItem('editSujetId') ;
  sujet!:Sujet;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;
  user!:User;
  map1 = new Map<any, any>();
  //@ViewChild('checkBoxId') checkBoxId!: ElementRef;
  visible: boolean = false;
  visibleModification: boolean = false;
  listeUtilisateur!: User[];
  dateDebut!:Date;
  datefin!:Date;
  dateFinModif!:Date;
  minDate= new Date();
  utilisateurModif!:User;
  constructor(
    private userService: UserService,
    private sujetService: SujetService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.datefin=new Date();
    this.listeUtilisateur = [];
    this.sujetService.getSujetById(+this.sujetId).subscribe(
      response=>{
        this.sujet=response;
        this.chercherUtilisateurSujet();
      }
    )
    
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(''),
    });
    this.findUsersIfRoleIsApprenant();
   
  }
  findUsersIfRoleIsApprenant() {
    let kw = this.searchFormGroup?.value.keyword;
    this.userService.findUsersIfRoleIsApprenant(kw).pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    ).subscribe(
      response=>{
        this.utilisateurs=response;
      }
    )
  }
  affectOrNoSujetToUser(user: User, checkBoxId: any) {
    this.user=user;
    const sujetIdStringify = String(this.sujetId);
    const sujetIdNumber = Number(this.sujetId);
    console.log('method clicked ', checkBoxId.target.checked);
    if (checkBoxId.target.checked) {


      this.visible=true;
      /*this.sujetService
        .affectSujetToUser(sujetIdStringify, user.userId)
        .subscribe(response=>{
        });*/
    } else {
      this.sujetService
        .deleteOneFromDocumentProjetUtilisateurs(sujetIdNumber, user.userId)
        .subscribe(
          response => {
           this.map1.delete(user.userId)
           
          });
    }
  }
  /*findAllDocumentProjetUtilisateurs(user: User) {
    this.sujetService
      .getDocumentProjetUtilisateurs(Number(this.sujetId), user.userId)
      .subscribe(() => {});
  }*/
  validerAffectation()
  {
    const sujetIdStringify = String(this.sujetId);
    //const sujetIdNumber = Number(this.sujetId);
    this.sujetService
        .affectSujetToUser(sujetIdStringify, this.user.userId,this.dateDebut,this.datefin)
        .subscribe(response=>{
          this.visible=false;
          this.user=null;
          this.dateDebut=null;
          this.datefin=null;
          this.chercherUtilisateurSujet();
        });
  }
  chercherUtilisateurSujet() {
    let idSujet = Number(localStorage.getItem('editSujetId')) || 0;
    this.userService.findUserBySujet(idSujet).subscribe((response) => {
      this.listeUtilisateur = response;
      for(let u of this.listeUtilisateur)
      {
        this.sujetService.trouverDocumentProjetUtilisateurs(this.sujet.id, u.userId).subscribe(
          reponse2=>{
            if(reponse2!=null)
            {
              
              //const map1 = new Map<any, any>();
              this.map1.set(u.userId,reponse2[0]);
              //this.tableauDesDates.push(map1);

            }
          });
      }
    });
  }

  verifierUserDansLaListe(idUser: string): boolean {
    for (let u of this.listeUtilisateur) {
      if (u.userId == idUser) return true;
    }
    return false;
  }
  chargerFinDate()
  {
    let dateFinObj = new Date(this.dateDebut);
    dateFinObj.setDate(dateFinObj.getDate() + this.sujet.timeConstraint);
    let dateFin = new Date(dateFinObj.getTime());
    this.datefin=dateFin;
   // console.log(this.dateDebut.getDate()+this.sujet.timeConstraint);
  }

  onDialogHide()
  {
    this.visible=false;
    this.user=null;
    this.dateDebut=null;
    this.datefin=null;
  }

  modifierDateFin(utilisateur:User)
  {
    this.visibleModification=true;
    this.utilisateurModif=utilisateur;
  }

  validerModification()
  {
    this.sujetService.modifierDateFin(""+this.sujet.id,this.utilisateurModif.userId,this.dateFinModif).subscribe(
      response=>{
        this.visibleModification=false;
        this.chercherUtilisateurSujet();
        
      }
    )
  }
  
}
