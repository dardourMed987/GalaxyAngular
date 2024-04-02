import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ModuleFormation } from 'src/app/model/module-formation';
import { ModuleFormationService } from 'src/app/services/module-formation.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css'],
})
export class ModulesComponent implements OnInit {
  listeModule!: Observable<ModuleFormation[]>;
  constructor(
    private moduleService: ModuleFormationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listeModule = this.moduleService.getModules();
  }

  ajouterModule() {
    this.router.navigateByUrl('/admin/addmodule');
  }

  supprimerModule(id: number) {
    this.moduleService
      .deleteModule(id)
      .subscribe(() => (this.listeModule = this.moduleService.getModules()));
  }

  modifierModule(id: number) {
    this.router.navigateByUrl('/admin/updatemodule/' + id);
  }
}
