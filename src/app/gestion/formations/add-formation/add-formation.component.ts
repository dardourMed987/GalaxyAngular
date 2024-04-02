import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FormationService } from 'src/app/services/formation.service';

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css'],
})
export class AddFormationComponent implements OnInit {
  constructor(
    private formationService: FormationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  formationForm!: FormGroup;

  ngOnInit(): void {
    this.formationForm = this.fb.group({
      formationName: this.fb.control(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      operationDate: this.fb.control(null, [Validators.required]),
      imageUrl: this.fb.control(null),
    });
  }

  saveFormation() {
    this.formationService
      .addFormation(this.formationForm.value)
      .subscribe(() => this.router.navigateByUrl('admin/formations'));
  }
}