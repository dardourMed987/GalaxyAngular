import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ClientLivrableHistory } from 'src/app/model/ClientLivrableHistory';
import { client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {


  clients!:client[];
  affichermodal=false;
  historiqueLivrable!:ClientLivrableHistory[];

  constructor(private clientService:ClientService,
              private router:Router,
              private config2: PrimeNGConfig)
  {}

  ngOnInit(): void {

    this.handleSearchClients();
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


  handleSearchClients() {

    this.clientService.getAllClient().subscribe(
      response=>{
        this.clients=response;
      }
    )
  }

  goToAddClientPage()
  {
    this.router.navigateByUrl('/admin/addClient');
  }
  afficherHistoriqueEnvoi(client:client)
  {
    this.historiqueLivrable=client.clientLivrableHistories;
  
    this.affichermodal=true;
  }



}
