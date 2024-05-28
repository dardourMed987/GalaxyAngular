import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Checkbox } from 'primeng/checkbox';
import { Password } from 'primeng/password';
import { LayoutService } from '../layout/service/app.layout.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  loginError: boolean = false;
  valCheck: string[] = ['remember'];
  password!: string;
  constructor(
    private fb: FormBuilder,
    private authSerivce: AuthService,
    private router: Router,
    public layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control(''),
    });
  }

  handleLogin() {
    let username = this.formLogin.value.username;
    let pwd = this.formLogin.value.password;
    this.authSerivce.login(username, pwd).subscribe({
      next: (data) => {
        this.loginError = false;
        this.authSerivce.loadProfile(data);
        if(this.authSerivce.compteActif==0)
        {
          console.log("compte innactif")
          this.authSerivce.isAuthenticated = false;
          this.authSerivce.accessToken = undefined;
          this.authSerivce.username = undefined;
          this.authSerivce.roles = undefined;
          window.localStorage.removeItem('jwt-token');
        }
        else
        {

       
        if(this.authSerivce.firstLogin==0)
        {
          this.router.navigateByUrl('/admin/updatePassword');
        }
        else
        {
          this.router.navigateByUrl('/admin/formation');
        }
      }
      },
      error: (err) => {
      
        console.log(err);
        this.loginError = true;

      },
    });
  }
  afficherAlerte() {
    alert('Veuillez contacter l\'administrateur de l\'application pour récupérer votre mot de passe.');
  }
}
