import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss'
})
export class AddClientComponent implements OnInit {

  newClientFormGroup!: FormGroup;

  constructor(private fb: FormBuilder,
              private clientService:ClientService,
              private router:Router)
  {}
  ngOnInit(): void {
    this.newClientFormGroup = this.fb.group({
      nom: this.fb.control(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      prenom: this.fb.control(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      raisonSociale: this.fb.control(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      
      
    });
  }

  handleSaveClient()
  {
    let client: client = this.newClientFormGroup.value;
    this.clientService.addClient(client).subscribe(
      Response=>{
        this.router.navigateByUrl('/admin/clients');
      }
    )


  }

  

}
