import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    selectedUser: any = {};
    nbrNotification!:number;

    subscription!: Subscription;

    constructor(public layoutService: LayoutService,
        public authService: AuthService,
    public userService: UserService,
    private router: Router,
    private notificationService:NotificationService) {
        this.subscription = this.notificationService.actualisationObservable$.subscribe(() => {
            this.afficherNbrification();
          });
     }
    ngOnInit(): void {
        this.nbrNotification=0;
    this.userService.getUsersByUsername(this.authService.username).subscribe({
      next: (data) => {
        this.selectedUser = data;
        this.userService.userCourant = data;
      },
    });

    this.afficherNbrification();
    }

    handleLogout() {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      }
      goToUserProfile() {
        this.router.navigateByUrl('/admin/user');
      }
    
      afficherNbrification()
      {
        this.notificationService.getNotificationsNonTraitees().subscribe(
          response=>{
           this.nbrNotification=response.length;
          }
        )
      }
}
