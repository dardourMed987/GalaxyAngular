import { Component,ElementRef,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  formUpdatePass!: FormGroup;
  pass!:string;
  Confirmpass!:string;
  erreurMessage: string | null = null;
  constructor(
    private fb: FormBuilder,
    private authSerivce: AuthService,
    private router: Router,
    private el: ElementRef,
    private userServive:UserService
    
  ) {}

  ngOnInit(): void {
    this.erreurMessage = null;
    this.formUpdatePass = this.fb.group({
      password: this.fb.control(''),
      passwordConfirm: this.fb.control(''),
    });
  }

  updatePass()
  {

    const passwordConfirm = this.el.nativeElement.querySelector('#passwordConfirm');
    if (this.pass!=this.Confirmpass) {
     this.erreurMessage = 'Les mots de passe ne correspondent pas.';
    }
    else
    {
      this.erreurMessage = null; 
      if(this.pass==this.Confirmpass)
    {
      this.userServive.changePassword(this.pass).subscribe(
        response=>{
          this.router.navigateByUrl('/admin/formation');
        }
      );
    }
    }


    
    
  }

  valeurPass()
  {
    this.pass = this.formUpdatePass.value.password;
    this.Confirmpass = this.formUpdatePass.value.passwordConfirm;
   
  }

}
