import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRole } from 'src/app/model/app-role';
import { AppRoleService } from 'src/app/services/app-role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  roles!: AppRole[];
  constructor(private appRoleService: AppRoleService, private router: Router) {}
  ngOnInit(): void {
    this.findAllAppRoles();
  }
  findAllAppRoles() {
    this.appRoleService.getAppRoles().subscribe((data) => {
      this.roles = data;
    });
  }
  goToAddRolePage() {
    this.router.navigateByUrl('/admin/addrole');
  }
  supprimerAppRole(role: string) {
    let conf = confirm('Êtes-vous sûr de vouloir supprimer ce role ?');
    if (!conf) return;
    this.appRoleService.deleteAppRole(role).subscribe(() => {
      this.findAllAppRoles();
    });
  }
}
