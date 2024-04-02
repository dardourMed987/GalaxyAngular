import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { Table, TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { Role } from 'src/app/enum/role.enum';
import { AppRoleService } from 'src/app/services/app-role.service';
import { Profile } from 'src/app/model/Profile';
import { ProfileService } from 'src/app/services/profile.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css'],
})
export class UtilisateursComponent implements OnInit {
  roles!:Role[];
  profils:Profile[];
  users!: Observable<Array<User>>;
  utilisateurs!:User[];
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;
  loading: boolean = false; 
  //une variable pour stocker la page actuelle
  p: number = 1;
  //nombre element par page
  itemsPerPage: number = 8;
  // instance de pagination
  config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: this.itemsPerPage,
    currentPage: this.p
  };
  @ViewChild('filter') filter!: ElementRef;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private roleService:AppRoleService,
    private profilService:ProfileService,
    private config2: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(''),
    });
    this.handleSearchUsers();
    this.searchRole();
    this.searchProfils();
    this.config2.setTranslation({
      startsWith: 'Commence par',
      contains: 'Contient', 
      endsWith: 'Se termine par', 
      equals: 'Égal à', 
      notEquals: 'Différent de', 
      lt: 'Inférieur à', 
      lte: 'Inférieur ou égal à', 
      gt: 'Supérieur à', 
      gte: 'Supérieur ou égal à',
      notContains: 'Ne contient pas',
      apply:'Appliquer',
      clear:'Effacer'
      
});
  }

  handleSearchUsers() {
    let kw = this.searchFormGroup?.value.keyword;
    this.userService.searchUsers(kw).pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    ).subscribe(
     response=> {
        this.utilisateurs=response
      }
    )
  }

  goToAddUserPage() {
    this.router.navigateByUrl('/admin/adduser');
  }

  handleDeleteUser(c: User) {
    let conf = confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
    if (!conf) return;
    this.userService.deleteUser(c.username).subscribe({
      next: (resp) => {
        this.handleSearchUsers();
        this.users = this.users.pipe(
          map((data) => {
            let index = data.indexOf(c);
            data.slice(index, 1);
            return data;
          })
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleCustomerAccounts(customer: User) {
    this.router.navigateByUrl('/customer-accounts/' + customer.userId, {
      state: customer,
    });
  }

  currentTutorial: any = {};
  currentIndex = -1;
  setActiveUser(user: User, index: number): void {
    this.currentTutorial = user;
    this.currentIndex = index;
  }

  searchRole()
  {
    this.roleService.getAppRoles().subscribe(
      response=>{
        this.roles=response;
       // console.log(this.roles);
      }
    )
  }


  searchProfils()
  {
    this.profilService.getProfiles().subscribe(
      response=>{
        this.profils=response
      }
    )
  }

  clear(table: Table) {
    table.clear();
    //this.filter.nativeElement.value = '';
}
}
