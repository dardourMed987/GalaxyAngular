import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, take } from 'rxjs';
import { Level } from 'src/app/enum/level.enum';
import { Profile } from 'src/app/model/Profile';
import { notification } from 'src/app/model/notification';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SujetService } from 'src/app/services/sujet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-sujet',
  templateUrl: './add-sujet.component.html',
  styleUrls: ['./add-sujet.component.css'],
})
export class AddSujetComponent implements OnInit {
  levelType = Object.values(Level);
  sujetForm!: FormGroup;
  utilisateur!:User;
  showAlert = false;
  profiles!:Profile[]
  
  constructor(
    private sujetService: SujetService,
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private notificationService:NotificationService,
    private userService:UserService,
    private profileService:ProfileService
  ) {}
  
  ngOnInit(): void {
    this.userService.get(this.authService.username).subscribe(
      response=>this.utilisateur=response
    )
    this.sujetForm = this.fb.group({
      title: this.fb.control(null, [Validators.required]),
      operationDate: this.fb.control(null, [Validators.required]),
      timeConstraint: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null, [Validators.required]),
      functionality: this.fb.control(null, [Validators.required]),
      expectedDelivery: this.fb.control(null, [Validators.required]),
      level: this.fb.control(null, [Validators.required]),
      developerRating: this.fb.control(null, [Validators.required]),
      stackTechnique: this.fb.control(null, [Validators.required]),
      profile: this.fb.control(null, [Validators.required]), 
    });
    this.findAllProfiles();
  }
  saveSujet() {
    this.sujetService
      .addSujet(this.sujetForm.value)
      .subscribe(response => {
        let notif= new notification();
        notif.sujet=response;
        notif.type="ajout";
        notif.utilisateur=this.utilisateur;
       
        this.notificationService.addNotification(notif).subscribe(
          response=>{
            console.log("ajout notif ok");
          }
        )
        this.showAlert = true;
        interval(3000).pipe(take(1)).subscribe(() => {
          this.showAlert = false;
          console.log("test")
          this.router.navigateByUrl('admin/sujet')
        })
        
      }
        );
  }
  cancelSaveSujet() {
    this.router.navigateByUrl('/admin/sujet');
  }
  findAllProfiles() {
    this.profileService.getProfiles().subscribe((data) => {
      this.profiles = data;
    });
  }
}
