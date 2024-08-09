import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Document } from 'src/app/model/document';
import { ModuleFormation } from 'src/app/model/module-formation';
import { DocumentServiceService } from 'src/app/services/document-service.service';
import { ModuleFormationService } from 'src/app/services/module-formation.service';

@Component({
  selector: 'app-update-module',
  templateUrl: './update-module.component.html',
  styleUrls: ['./update-module.component.css'],
})
export class UpdateModuleComponent implements OnInit {
  moduleForm!: FormGroup;
  documents: any[] = [];
  pregressBar = false;
  moduleId!: number;

  constructor(
    private fb: FormBuilder,
    private moduleService: ModuleFormationService,
    private documentService: DocumentServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.moduleForm = this.fb.group({
      moduleName: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      documents: this.fb.control([]),
    });

    this.moduleId = this.route.snapshot.params['id'];
    console.log(this.moduleId)
    this.loadModuleDetails();
    this.loadDocuments();
  }

  loadModuleDetails() {
    this.moduleService.getModuleById(this.moduleId).subscribe((module: ModuleFormation) => {
      if (module && module.documents) {
        this.moduleForm.patchValue({
          moduleName: module.moduleName,
          documents: module.documents, 
        });
      }
    });
  }

  loadDocuments() {
    this.documentService.getDocuments().subscribe((data: any) => {
      this.documents = data;
    });
  }

  handleSaveModule() {
    if (this.moduleForm.valid) {
      let module: ModuleFormation = this.moduleForm.value;
      module.id=this.moduleId;
      this.pregressBar = true;
      this.moduleService.updateModule(module).subscribe({
        next: (data: any) => {
          alert('Module modifié avec succès!');
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
