import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Formation } from 'src/app/model/formation';
import { ModuleFormationService } from 'src/app/services/module-formation.service';

@Component({
  selector: 'app-update-module',
  templateUrl: './update-module.component.html',
  styleUrls: ['./update-module.component.css'],
})
export class UpdateModuleComponent implements OnInit {
  moduleForm?: FormGroup;
  listeFormation!: Formation[];
  id!: number;

  constructor(
    private moduleService: ModuleFormationService,
    private fb: FormBuilder,
    private router: Router,
    private ar: ActivatedRoute
  ) {
    this.id = ar.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.moduleService.getModuleById(this.id).subscribe((data) => {
      this.listeFormation = data.formations;
      this.moduleForm = this.fb.group({
        id: this.fb.control(data.id),
        moduleName: this.fb.control(data.moduleName, [
          Validators.required,
          Validators.minLength(4),
        ]),
        operationDate: this.fb.control(data.operationDate, [
          Validators.required,
        ]),
        imageUrl: this.fb.control(data.imageUrl),
        formations: this.fb.control(data.formations),
      });
    });
  }

  modifierFormation() {
    this.moduleService
      .updateModule(this.moduleForm?.value)
      .subscribe(() => this.router.navigateByUrl('admin/modules'));
  }
}
