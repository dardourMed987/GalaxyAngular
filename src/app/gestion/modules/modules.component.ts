import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Document } from 'src/app/model/document';
import { ModuleFormation } from 'src/app/model/module-formation';
import { ModuleFormationService } from 'src/app/services/module-formation.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css'],
})
export class ModulesComponent implements OnInit {
  listeModule!: ModuleFormation[];
  visibleDetails: boolean = false;
  selectedModuleDocuments: Document[] = [];
  constructor(
    private moduleService: ModuleFormationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadModules();
  }

  ajouterModule() {
    this.router.navigateByUrl('/admin/addmodule');
  }

  supprimerModule(id: number) {
    this.moduleService
      .deleteModule(id)
      .subscribe(() => (
        this.loadModules()
      ));
  }

  modifierModule(id: number) {
    this.router.navigateByUrl('/admin/updatemodule/' + id);
  }

  loadModules() {
    this.moduleService.getModules().subscribe((data) => {
      this.listeModule = data;
    });
  }
  showDocuments(module: ModuleFormation) {
    this.selectedModuleDocuments = module.documents;
    console.log(this.selectedModuleDocuments)
    this.visibleDetails = true;
  }

  onDialogHide() {
    this.visibleDetails = false;
    this.selectedModuleDocuments = null;
  }



}
