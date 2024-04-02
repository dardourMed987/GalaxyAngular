import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from 'src/app/model/Profile';
import { User } from 'src/app/model/user';
import { AppRoleService } from 'src/app/services/app-role.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-utlisateur',
  templateUrl: './add-utlisateur.component.html',
  styleUrls: ['./add-utlisateur.component.css'],
})
export class AddUtlisateurComponent {
  newUserFormGroup!: FormGroup;
  appRoles!: any[];
  profiles!:Profile[]
  afficherProfile=false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private appRoleService: AppRoleService,
    private profileService:ProfileService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.newUserFormGroup = this.fb.group({
      firstName: this.fb.control(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      lastName: this.fb.control(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      username: this.fb.control(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      roles: this.fb.control([], [Validators.required]),
      active: this.fb.control(true, [Validators.required]),
      profile: this.fb.control(null), 
    });
    this.findAllAppRoles();
    this.findAllProfiles();
  }

  handleSaveUser() {
    let user: User = this.newUserFormGroup.value;
    this.userService.addUser(user).subscribe({
      next: (data: any) => {
        alert('Ajout effectué avec succès!');
        //this.newCustomerFormGroup.reset();
        this.router.navigateByUrl('/admin/utilisateurs');
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // list_role: Array<Role> = [{ role: 'ADMIN' }, { role: 'USER' }];
  findAllAppRoles() {
    this.appRoleService.getAppRoles().subscribe((data) => {
      this.appRoles = data;
    });
  }

  findAllProfiles() {
    this.profileService.getProfiles().subscribe((data) => {
      this.profiles = data;
    });
  }

  onRolesChange() {
    if (this.newUserFormGroup) {
      const selectedRoles = this.newUserFormGroup.get('roles') || null;
      const listeRole=selectedRoles?.value
      console.log(listeRole)
      if (listeRole.some((r: { role: string; }) => r.role === 'APPRENANT')) {
        this.afficherProfile=true;
      }
      else
      {
        this.afficherProfile=false;
       // let  p= this.profiles.find(profile => profile.id === 0);
        this.newUserFormGroup.patchValue({ profile: null });
      }
      
    }

  }
  
}
