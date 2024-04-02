import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRole } from 'src/app/model/app-role';
import { AppRoleService } from 'src/app/services/app-role.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css'],
})
export class AddRoleComponent implements OnInit {
  appRole: AppRole = new AppRole();
  appRoleForm!: FormGroup;
  constructor(
    private appRoleService: AppRoleService,
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.appRoleForm = this.fb.group({
      role: this.fb.control(null, [Validators.required]),
    });
  }
  saveAppRole() {
    this.appRoleService
      .addAppRole(this.appRoleForm.value)
      .subscribe(() => this.router.navigateByUrl('admin/role'));
  }
}
