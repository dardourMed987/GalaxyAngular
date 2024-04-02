import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { Sujet } from 'src/app/model/sujet';
import { AuthService } from 'src/app/services/auth.service';
import { SujetService } from 'src/app/services/sujet.service';

@Component({
  selector: 'app-sujet-supp',
  templateUrl: './sujet-supp.component.html',
  styleUrls: ['./sujet-supp.component.css']
})
export class SujetSuppComponent implements OnInit{

  sujets!: any[];
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

  constructor(
    private sujetService: SujetService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sujets=[];
    this.getSujets();
  }

  getSujets() {
    this.sujetService.getSujetsSupp().subscribe((data) => {
      this.sujets = data;
    });
  }

  gotToPageDisplaySujet(sujet: Sujet) {
    localStorage.removeItem('editSujetId');
    localStorage.setItem('editSujetId', sujet.id.toString());
    this.router.navigateByUrl('/admin/affichersujet/' + sujet.id);
  }

  goToPageActiverSujet(sujet:Sujet)
  {
    sujet.statut=2
    this.sujetService.updateSujetStatus(sujet).subscribe(
      response=>{
        console.log('activation sujet ok');
        this.getSujets();
      }
    )
  }

}
