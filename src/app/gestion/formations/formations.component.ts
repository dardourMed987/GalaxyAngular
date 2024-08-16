import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Formation } from 'src/app/model/formation';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { FormationService } from 'src/app/services/formation.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css'],
})
export class FormationsComponent implements OnInit {
  listeFormation!: Formation[];
  baseUrl!:string;


  visibleAffectation: boolean = false;
  utilisateurs: User[] = [];  
  selectedUtilisateurs: User[] = [];
  formation: Formation;

    galleriaResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    visibleDetails=false;
    formationModal!:Formation;



  constructor(
    private formationService: FormationService,
    public authService: AuthService,
    private utilisateurService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (
      this.authService.roles == 'APPRENANT'
    ) {
      this.getFormationByUsername()
      
    } else {
      this.getFormation()
    }
    this.baseUrl=environment.backendHost+"/images/";
    this.formationModal= new Formation();
    this.utilisateurService.getUsers().subscribe(data => {
      this.utilisateurs = data;
    });
  }

  ajouterFormation() {
    this.router.navigateByUrl('/admin/addformation');
  }

  supprimerFormation(id: number) {
    this.formationService
      .deleteFormation(id)
      .subscribe(
        () => (this.getFormation())
      );
  }

  modifierFormation(id: number) {
    this.router.navigateByUrl('/admin/updateformation/' + id);
  }

  getFormation()
  {
    this.formationService.getFormations().subscribe(
      response=>{
        this.listeFormation=response;
      }
    )
  }

  getFormationByUsername()
  {
    this.formationService.getFormationByUsername(this.authService.username).subscribe(
      response=>{
        this.listeFormation=response;
      }
    )
  }

  openModal(formation:Formation) {
    
    this.formationModal=formation;
    this.visibleDetails=true;
    
  }

  onDialogHide()
  {
    this.visibleDetails=false;
  }

  showFormation(id:number)
  {
    this.router.navigateByUrl('/admin/showformation/' + id);
  }

  openModalAffectation(formation: Formation) {
    this.formation = formation;
    if (formation.utilisateurs && formation.utilisateurs.length > 0) {
      this.selectedUtilisateurs = this.utilisateurs.filter(utilisateur =>
        formation.utilisateurs.some(fUser => fUser.userId === utilisateur.userId)
      );
    } else {
      this.selectedUtilisateurs = [];
    }
    this.visibleAffectation = true;
  }

  affecterFormation() {
    this.formation.utilisateurs = this.selectedUtilisateurs;
    this.visibleAffectation = false;
    this.formationService
    .updateFormation(this.formation)
    .subscribe(() => this.router.navigateByUrl('admin/formations'));
   
  }

  onDialogHideAffectation() {
    this.selectedUtilisateurs = [];  
  }


}
