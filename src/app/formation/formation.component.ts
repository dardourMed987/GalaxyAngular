import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../demo/api/product'; 
import { ProductService } from '../demo/service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SujetService } from '../services/sujet.service';
import { Sujet } from '../model/sujet';
import { Router } from '@angular/router';
import { LivrableService } from '../services/livrable.service';
import { EvaluationLivrableService } from '../services/evaluation-livrable.service';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css'],
})
export class FormationComponent implements OnInit {


    sujets!: any[];
    livrables!: any[];
    utilisateur!:User;

    constructor(private sujetService:SujetService,
        private router: Router,
        private livrableService:LivrableService,
        private evaluationLivrableservice:EvaluationLivrableService,
        public authService: AuthService,
        private userService: UserService,) {
       
        
    }

    ngOnInit() {
      this.userService.get(this.authService.username).subscribe((data) => {
        this.utilisateur = data;
       // console.log(this.utilisateur.userId)
      });
      if (
        this.authService.roles == 'ADMIN USER' ||
        this.authService.roles == 'FORMATEUR'
      ) {
        this.getSujets();
      } else {
        this.getSujetsByUsername();
      }
        
        this.handleSearchLivrables();
    }

    getSujets() {
        this.sujetService.getSujets().subscribe((data) => {
          this.sujets = data;
          this.sujets.sort((a, b) => b.id - a.id)
          this.sujets=this.sujets.slice(0,5)
        });
      }

      getSujetsByUsername() {
        this.sujetService
          .getSujetsByUsername(this.authService.username)
          .subscribe((data) => {
            this.sujets = data;
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
          this.sujets.sort((a, b) => b.id - a.id)
          this.sujets=this.sujets.slice(0,5)
          });
      }

      gotToPageDisplaySujet(sujet: Sujet) {
        localStorage.removeItem('editSujetId');
        localStorage.setItem('editSujetId', sujet.id.toString());
        this.router.navigateByUrl('/admin/affichersujet/' + sujet.id);
      }

      handleSearchLivrables() {
        
        this.livrableService.searchLivrable('').subscribe(
          response=>{
            this.livrables=response
            this.livrables.sort((a, b) => b.id - a.id)
            this.livrables=this.livrables.slice(0,5)
            for(let liv of this.livrables)
            {
              this.evaluationLivrableservice.getEvaluationByLivrable(liv.id).subscribe(
                response=>liv.evaluationLivrable=response
              )
            }
            //console.log(this.livrables)
          }
        );
      }
  goToPageAddLivrable() {
        this.router.navigateByUrl('/admin/addlivrable');
      }
}
