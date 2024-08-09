import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Formation } from 'src/app/model/formation';
import { ModuleFormation } from 'src/app/model/module-formation';
import { DocumentServiceService } from 'src/app/services/document-service.service';
import { FormationService } from 'src/app/services/formation.service';
import { ModuleFormationService } from 'src/app/services/module-formation.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css'],
})
export class AddModuleComponent implements OnInit {
  moduleForm!: FormGroup;
  documents: any[] = [];
  selectedDocuments: any[] = [];
  pregressBar = false;

  constructor(
    private fb: FormBuilder,
    private moduleService: ModuleFormationService,
    private documentService: DocumentServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.moduleForm = this.fb.group({
      moduleName: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      documents: this.fb.control([]),
    });

    this.loadDocuments();
  }

  loadDocuments() {
    this.documentService.getDocuments().subscribe((data: any) => {
      this.documents = data;
    });
  }

  handleSaveModule() {
    if (this.moduleForm.valid) {
      let module: ModuleFormation = this.moduleForm.value;
      this.pregressBar = true;
      this.moduleService.addModule(module).subscribe({
        next: (data: any) => {
          alert('Module ajouté avec succès!');
          this.pregressBar = false;
          this.router.navigateByUrl('/admin/modules');
        },
        error: (err: any) => {
          this.pregressBar = false;
          console.log(err);
        },
      });
    }
  }
}
