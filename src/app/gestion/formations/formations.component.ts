import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Formation } from 'src/app/model/formation';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFormation();
    this.baseUrl=environment.backendHost+"/images/";
    this.formationModal= new Formation();
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

}
