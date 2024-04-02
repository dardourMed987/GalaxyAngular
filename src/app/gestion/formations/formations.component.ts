import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Formation } from 'src/app/model/formation';
import { AuthService } from 'src/app/services/auth.service';
import { FormationService } from 'src/app/services/formation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css'],
})
export class FormationsComponent implements OnInit {
  listeFormation!: Observable<Formation[]>;
  constructor(
    private formationService: FormationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listeFormation = this.formationService.getFormations();
  }

  ajouterFormation() {
    this.router.navigateByUrl('/admin/addformation');
  }

  supprimerFormation(id: number) {
    this.formationService
      .deleteFormation(id)
      .subscribe(
        () => (this.listeFormation = this.formationService.getFormations())
      );
  }

  modifierFormation(id: number) {
    this.router.navigateByUrl('/admin/updateformation/' + id);
  }
}
