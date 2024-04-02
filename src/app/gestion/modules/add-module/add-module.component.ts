import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Formation } from 'src/app/model/formation';
import { FormationService } from 'src/app/services/formation.service';
import { ModuleFormationService } from 'src/app/services/module-formation.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css'],
})
export class AddModuleComponent implements OnInit {
  constructor(
    private moduleService: ModuleFormationService,
    private fb: FormBuilder,
    private router: Router,
    private formationService: FormationService
  ) {}

  moduleForm!: FormGroup;
  listeFormation!: Formation[];

  ngOnInit(): void {
    this.formationService.getFormations().subscribe((data) => {
      this.listeFormation = data;
      this.moduleForm = this.fb.group({
        moduleName: this.fb.control(null, [
          Validators.required,
          Validators.minLength(4),
        ]),
        operationDate: this.fb.control(null, [Validators.required]),
        imageUrl: this.fb.control(null),
        formations: this.fb.control(this.listeFormation),
        documents: this.fb.array([]),
      });
    });
  }

  saveModule() {
    this.moduleService
      .addModule(this.moduleForm.value)
      .subscribe(() => this.router.navigateByUrl('admin/modules'));
  }

  get documents() {
    return this.moduleForm.get('documents') as FormArray;
  }

  ajouterDocument() {
    const document = this.fb.group({
      documentName: ['', Validators.required],
      operationDate: ['', Validators.required],
      documentUrl: [''],
    });

    this.documents.push(document);
  }

  supprimerDocument(index: number) {
    this.documents.removeAt(index);
  }
}
