import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from 'src/app/services/formation.service';

@Component({
  selector: 'app-update-formation',
  templateUrl: './update-formation.component.html',
  styleUrls: ['./update-formation.component.css'],
})
export class UpdateFormationComponent implements OnInit {
  formationForm?: FormGroup;
  id!: number;

  constructor(
    private formationService: FormationService,
    private fb: FormBuilder,
    private router: Router,
    private ar: ActivatedRoute
  ) {
    this.id = ar.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.formationService.getFormationById(this.id).subscribe((data) => {
      this.formationForm = this.fb.group({
        id: this.fb.control(data.id),
        formationName: this.fb.control(data.formationName, [
          Validators.required,
          Validators.minLength(4),
        ]),
        operationDate: this.fb.control(data.operationDate, [
          Validators.required,
        ]),
        imageUrl: this.fb.control(data.imageUrl),
      });
    });
  }

  modifierFormation() {
    this.formationService
      .updateFormation(this.formationForm?.value)
      .subscribe(() => this.router.navigateByUrl('admin/formations'));
  }
}
