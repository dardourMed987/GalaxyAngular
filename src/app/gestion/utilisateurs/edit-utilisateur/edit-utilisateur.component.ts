import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoleService } from 'src/app/services/app-role.service';
import { Profile } from 'src/app/model/Profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-edit-utilisateur',
  templateUrl: './edit-utilisateur.component.html',
  styleUrls: ['./edit-utilisateur.component.css'],
})
export class EditUtilisateurComponent implements OnInit {
  newUserFormGroup: any = null;
  appRoles!: any[];
  profiles!:Profile[]
  object1: any = new User();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private appRoleService: AppRoleService,
    private route: ActivatedRoute,
    private profileService:ProfileService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.newUserFormGroup = this.fb.group({
      userId: this.fb.control(this.object1.userId, [
        Validators.required,
        Validators.minLength(1),
      ]),
      firstName: this.fb.control(this.object1.firstName, [
        Validators.required,
        Validators.minLength(1),
      ]),
      lastName: this.fb.control(this.object1.lastName, [
        Validators.required,
        Validators.minLength(1),
      ]),
      username: this.fb.control(this.object1.username, [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: this.fb.control(this.object1.email, [
        Validators.required,
        Validators.email,
      ]),
      active: this.fb.control(this.object1.active, [Validators.required]),
    });
    this.userService
      .getUsersByUsername(this.route.snapshot.params['username'])
      .subscribe({
        next: (data: any) => {
          this.object1 = data;
        },
        error: (e: any) => {},
        complete: () => {
          this.newUserFormGroup = this.fb.group({
            userId: this.fb.control(this.object1.userId, [
              Validators.required,
              Validators.minLength(1),
            ]),
            firstName: this.fb.control(this.object1.firstName, [
              Validators.required,
              Validators.minLength(1),
            ]),
            lastName: this.fb.control(this.object1.lastName, [
              Validators.required,
              Validators.minLength(1),
            ]),
            username: this.fb.control(this.object1.username, [
              Validators.required,
              Validators.minLength(4),
            ]),
            email: this.fb.control(this.object1.email, [
              Validators.required,
              Validators.email,
            ]),
            active: this.fb.control(this.object1.active, [Validators.required]),
          });
         // this.newUserFormGroup.get('profile').setValue(this.object1.profile); 
         this.newUserFormGroup.patchValue({
          profile: this.object1.profile,
        });
         // this.newUserFormGroup.controls['profile'].setValue(this.object1.profile, {onlySelf: true});
        },
        
      });
      this.findAllAppRoles();
      this.findAllProfiles();
  }
  handleSaveUser() {
    let user: User = this.newUserFormGroup.value;
    this.userService.addUser(user).subscribe({
      next: (data: any) => {
        alert('User has been successfully saved!');
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
}
